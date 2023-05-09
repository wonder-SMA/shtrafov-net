import { FC, useState, useCallback, useRef } from 'react';
import AccountEmails from '@/components/elements/collapses/AccountEmails';
import BankAccounts from '@/components/elements/collapses/BankAccounts';
import Button from '@/components/elements/ui/buttons/Button';
import ClientDetails from '@/components/elements/collapses/ClientDetails';
import Form from '@/components/layouts/Form';
import Meta from '@/components/elements/collapses/Meta';
import OrganizationDetails from '@/components/elements/collapses/OrganizationDetails';
import Modal from '@/components/layouts/Modal';
import { useActions } from '@/hooks/useActions';

type CustomerModalProps = {
  onClose: () => void;
}

const NewCustomer: FC<CustomerModalProps> = ({ onClose }) => {
    const [isCollapsedAll, setIsCollapsedAll] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const { clearState, createNewCustomer } = useActions();

    const onCloseWithConfirm = useCallback(() => {
      const isConfirmed = confirm('Данные будут потеряны. Вы действительно хотите закрыть окно?');
      if (isConfirmed) {
        onClose();
        clearState();
      }
    }, [onClose]);

    const onCollapseAll = useCallback(() => {
      if (formRef.current) {
        const collapseList = formRef.current.getElementsByClassName('collapse');

        for (let i = 0; i < collapseList.length; i++) {
          const collapseBody = (collapseList[i].lastChild as HTMLDivElement);
          const visibility = getComputedStyle(collapseBody).visibility;

          if (isCollapsedAll && visibility === 'hidden' || !isCollapsedAll && visibility === 'visible') {
            (collapseList[i].firstChild as HTMLDivElement).click();
          }
        }
        setIsCollapsedAll(prevState => !prevState);
      }
    }, [formRef.current, isCollapsedAll]);

    const onCreate = useCallback(() => {
      if (formRef.current) {
        const form = formRef.current;

        if (form.checkValidity()) {
          createNewCustomer(() => onClose());
        } else {
          const collapseList = form.getElementsByClassName('collapse');

          for (let i = 0; i < collapseList.length; i++) {
            const collapse = collapseList[i];
            const invalidInput = collapse.querySelector(':invalid');

            if (invalidInput) {
              collapse.classList.contains('collapsed') && (collapse.firstChild as HTMLDivElement).click();
              const timerId = setTimeout(() => {
                (invalidInput as HTMLInputElement).focus();
                clearTimeout(timerId);
              }, 0);
              break;
            }
          }
        }
      }
    }, [formRef.current]);

    return (
      <Modal heading="Создание Цены" onClose={onCloseWithConfirm}>
        <Form
          name="new-customer"
          button={
            <Button onClick={onCreate}>Создать</Button>
          }
          ref={formRef}
        >
          <Button type="ghost" className="absolute top-right" onClick={onCollapseAll}>
            {isCollapsedAll ? 'Раскрыть все' : 'Свернуть все'}
          </Button>
          <ClientDetails />
          <OrganizationDetails />
          <BankAccounts />
          <AccountEmails />
          <Meta />
        </Form>
      </Modal>
    );
  }
;

export default NewCustomer;
