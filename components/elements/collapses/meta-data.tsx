import { FC, useCallback } from 'react';
import { useActions } from '@/hooks/use-actions';
import { useTypedSelector } from '@/hooks/use-typed-selector';
import Button from '@/components/elements/ui/buttons/button';
import DeleteIconButton from '@/components/elements/ui/buttons/delete-icon-button';
import DataIcon from '@/components/elements/ui/icons/data-icon';
import Collapse from '@/components/layouts/collapse';
import TextInput from '@/components/elements/ui/text-input';
import { TModalMetaData } from '@/types/tables';

const MetaData: FC = () => {
  const { rawMetaData } = useTypedSelector(state => state.newCustomerModalReducer);
  const { setRawMeta, addRawMeta, deleteRawMeta } = useActions();

  // Возвращает функцию с замыканием на индекс строки таблицы и название колонки для ячейки с инпутом
  const changeHandler = useCallback((index: number, tableEntryKey: keyof TModalMetaData) => {
    return (changedValue: string) => {
      setRawMeta({ index, tableEntryKey, changedValue });
    };
  }, []);

  const addHandler = useCallback(() => addRawMeta(), []);

  // Возвращает функцию с замыканием на индекс строки таблицы для ячейки с кнопкой удаления
  const deleteHandler = useCallback((index: number) => {
    return () => deleteRawMeta({ index });
  }, []);

  return (
    <>
      <Collapse title="MetaData">
        <table className="table">
          <thead className="thead">
          <tr>
            <th>Ключ</th>
            <th>Значение</th>
            <th></th>
          </tr>
          </thead>
          <tbody className="tbody">
          {rawMetaData.length
            ? rawMetaData.map((data, index) => (
              <tr key={data.id}>
                <td>
                  <TextInput className="items-center" onChange={changeHandler(index, 'key')} />
                </td>
                <td>
                  <TextInput className="items-center" onChange={changeHandler(index, 'value')} />
                </td>
                <td>
                  <DeleteIconButton className="margin-center" onDelete={deleteHandler(index)} />
                </td>
              </tr>
            ))
            : <tr>
              <td colSpan={3} className="empty-cell">
                <div className="empty-cell__content">
                  <DataIcon />
                  <span className="empty-cell__text">No Data</span>
                </div>
              </td>
            </tr>
          }
          </tbody>
        </table>
        <Button type="link" className="self-end" onClick={addHandler}>
          Добавить еще ключ - значение
        </Button>
      </Collapse>

      <style jsx>
        {`
          .table, th, td {
            border: 1px solid #d1d5db;
          }

          .table {
            width: 100%;
            text-align: left;
            border-collapse: collapse;

            & tr {
              font-size: 1rem;
              line-height: 1.25rem;
              color: inherit;
            }

            .thead {
              width: 100%;
              background-color: #f3f4f6;

              & th {
                padding: 1rem;
                font-weight: 600;
              }
            }

            .tbody {
              width: 100%;

              & .empty-cell {
                text-align: center;

                .empty-cell__content {
                  padding: 2rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;

                  .empty-cell__text {
                    font-size: 1.25rem;
                    line-height: 2rem;
                    color: #d1d5db;
                  }
                }
              }

              & td {
                padding: 0.5rem;
              }

              @media (min-width: 768px) {
                & td {
                  padding: 1rem;
                }
              }
            }
          }
        `}
      </style>
    </>
  );
};

export default MetaData;
