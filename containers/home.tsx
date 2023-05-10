import { useEffect, FC, useMemo, useCallback } from 'react';
import { Column, useSortBy, useTable } from 'react-table';
import Header from '@/components/layouts/header';
import Button from '@/components/elements/ui/buttons/button';
import Main from '@/components/layouts/main';
import Modal from '@/containers/modal';
import Search from '@/components/elements/ui/search';
import Table from '@/components/elements/table';
import UploadIndicator from '@/components/elements/ui/upload-indicator';
import UploadIndicatorContainer from '@/components/layouts/upload-indicator-container';
import { formatDate } from '@/helpers/format-date';
import { formatDays } from '@/helpers/format-days';
import { useTypedSelector } from '@/hooks/use-typed-selector';
import { useActions } from '@/hooks/use-actions';
import { TMainTableData } from '@/types/tables';

const Home: FC = () => {
  const { customers } = useTypedSelector(state => state.customersReducer);
  const { countOpenModals } = useTypedSelector(state => state.modalReducer);
  const { getCustomers, setIsOpen } = useActions();

  useEffect(() => {
    getCustomers();
  }, []);

  const columns = useMemo<readonly Column<TMainTableData>[]>(
    () => [
      {
        Header: 'Имя',
        accessor: 'name',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Отсрочка оплаты',
        accessor: 'deferral_days',
      },
      {
        Header: 'Создан',
        accessor: 'created_at',
      },
      {
        Header: 'Изменен',
        accessor: 'updated_at',
      },
    ],
    [],
  );

  const data = useMemo(
    () => (
      customers?.map(({ customer }) => (
        {
          name: `${customer.name}`,
          id: `${customer.id}`,
          email: `${customer.email}`,
          deferral_days: `${formatDays(customer.deferral_days)}`,
          created_at: `${formatDate(customer.created_at)}`,
          updated_at: `${formatDate(customer.updated_at)}`,
        }
      ))
    ),
    [customers],
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const onOpen = useCallback(() => {
    setIsOpen({ name: 'newCustomer', isOpen: true });
  }, []);

  if (customers?.length) {

    return (
      <Main title="Home">
        <Header heading="Клиенты">
          <Search onSearch={() => {}} placeholder="Поиск" />
          <Button onClick={onOpen}>+ Добавить клиента</Button>
        </Header>
        <main>
          <Table data={tableInstance} isEnabledScroll={!countOpenModals} />
          <Modal modalNames={['newCustomer']} />
        </main>
      </Main>
    );
  }

  return (
    <UploadIndicatorContainer>
      <UploadIndicator
        colors={['#F56565', '#ED8936', '#ECC94B', '#48BB78', '#38B2AC', '#4299E1', '#667EEA', '#9F7AEA', '#008b8b']}
      />
    </UploadIndicatorContainer>
  );
};

export default Home;
