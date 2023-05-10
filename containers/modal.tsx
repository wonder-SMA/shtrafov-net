import { FC, useCallback } from 'react';
import modals from './modals';
import { useTypedSelector } from '@/hooks/use-typed-selector';
import { useActions } from '@/hooks/use-actions';
import { TModalName } from '@/types/modal-name';

type ModalProps = {
  modalNames: TModalName[];
}

const Modal: FC<ModalProps> = ({ modalNames }) => {
  const { isOpenModals } = useTypedSelector(state => state.modalReducer);
  const { setIsOpen } = useActions();

  const onClose = useCallback(() => {
    setIsOpen({ name: 'newCustomer', isOpen: false });
  }, []);

  return (
    <>
      {modalNames.map(modalName => {
        const Modal = modals[modalName];
        const isOpen = isOpenModals.get(modalName);

        if (isOpen) {
          return <Modal key={modalName} onClose={onClose} />;
        }
      })}
    </>
  );
};

export default Modal;
