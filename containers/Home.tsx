import { useEffect, FC, useMemo, useCallback } from 'react';
import { Column, useSortBy, useTable } from 'react-table';
import Header from '@/components/layouts/Header';
import Button from '@/components/elements/ui/buttons/Button';
import Layout from '@/components/layouts/Layout';
import Modal from '@/containers/Modal';
import Search from '@/components/elements/ui/Search';
import Table from '@/components/elements/Table';
import UploadIndicator from '@/components/elements/ui/UploadIndicator';
import UploadIndicatorContainer from '@/components/layouts/UploadIndicatorContainer';
import { formatDate } from '@/utils/formatDate';
import { formatDays } from '@/utils/formatDays';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { TMainTableData } from '@/types/Tables';

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
      <Layout title="Home">
        <Header heading="Клиенты">
          <Search onSearch={() => {}} placeholder="Поиск" />
          <Button onClick={onOpen}>+ Добавить клиента</Button>
        </Header>
        <main>
          <Table data={tableInstance} isEnabledScroll={!countOpenModals} />
          <Modal modalNames={['newCustomer']} />
        </main>
      </Layout>
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
