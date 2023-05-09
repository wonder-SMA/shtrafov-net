import { FC, PropsWithChildren, useCallback, useLayoutEffect, useRef } from 'react';
import { Cell, HeaderGroup, TableInstance } from 'react-table';
import { toast } from 'react-toastify';
import CopyIconButton from '@/components/elements/ui/buttons/CopyIconButton';
import SortIcon from '@/components/elements/ui/icons/SortIcon';
import { copyTextToClipboard } from '@/utils/copyTextToClipboard';
import { TMainTableData } from '@/types/Tables';

type TableProps = {
  data: TableInstance<TMainTableData>;
  isEnabledScroll: boolean;
}

const Table: FC<PropsWithChildren<TableProps>> = ({ data, isEnabledScroll }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = data;
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (tableContainerRef.current) {
      const documentHeight = document.documentElement.offsetHeight;
      tableContainerRef.current.style.height = `${documentHeight - 16 - 48}px`;
    }
  }, []);

  // Возвращает функцию с замыканием на ячейку
  const onCopy = useCallback((cell: Cell<TMainTableData, any>) => {
    return async () => {
      await copyTextToClipboard(cell.value);
      toast.success('Copied!');
    };
  }, []);

  // Возвращает функцию с замыканием на заголовок колонки
  const onSort = useCallback((column: HeaderGroup<TMainTableData>) => {
    return () => column.toggleSortBy();
  }, []);

  return (
    <>
      <div className="container" ref={tableContainerRef}>
        <table className="table">
          <thead {...getTableProps()} className="thead">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}
                    className="th"
                    tabIndex={0}
                    onClick={onSort(column)}
                    onKeyDown={onSort(column)}
                >
                  <span className={`th__text ${column.isSorted ? 'sorted' : ''}`}>
                    {column.render('Header')}
                  </span>
                  {column.isSorted ? <SortIcon isRotate={column.isSortedDesc} /> : ''}
                </th>
              ))}
            </tr>
          ))}
          </thead>

          <tbody {...getTableBodyProps()} className="tbody">
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="tr">
                {row.cells.map((cell, index) => (
                  <td {...cell.getCellProps()} className={`td ${index === 1 ? 'flex' : ''}`}>
                    {cell.render('Cell')}
                    {index === 1 &&
                      <CopyIconButton onCopy={onCopy(cell)} />
                    }
                  </td>
                ))}
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>

      <style jsx>
        {`
          .container {
            overflow: ${isEnabledScroll ? 'auto' : 'hidden'};
            scrollbar-gutter: auto;
            overflow: ${isEnabledScroll ? 'overlay' : 'hidden'};;

            .table {
              width: 100%;
              text-align: left;
              border-collapse: collapse;

              .thead {
                position: sticky;
                top: 0;
                background-color: #f3f4f6;

                .th {
                  padding: 0.5rem;
                  vertical-align: baseline;
                  font-weight: 600;
                  outline: none;
                  user-select: none;
                  cursor: pointer;

                  &:hover, &:focus-visible {
                    outline: 2px solid #4b5563;;
                    outline-offset: -4px;
                  }
                }

                .th__text.sorted {
                  margin-right: 8px;
                }
              }

              .tbody {
                .tr {
                  border-top: 1px solid #d1d5db;
                  border-bottom: 1px solid #d1d5db;
                }
              }

              .tr {
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: inherit;

                .th:not(:last-child), .td:not(:last-child) {
                  padding-right: 0.75rem;
                }

                .td {
                  padding: 0.5rem 0;
                  white-space: nowrap;

                  .copy-icon {
                    margin-left: 8px;
                    cursor: pointer;
                  }
                }

                .td.flex {
                  display: flex;
                  flex-wrap: nowrap;
                  gap: 0.5rem;
                }
              }
            }
          }
        `}
      </style>
    </>
  );
};

export default Table;
