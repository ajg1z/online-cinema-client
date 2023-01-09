/* eslint-disable react/jsx-key */
import { FC } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CSSTransition } from 'react-transition-group';

import SkeletonLoader from '../../skeleton-loader/SkeletonLoader';
import { IAdminTableColumn, IAdminTableRow } from '../admin-table.types';
import { getTemplateColumns } from '../getTemplateColumns';

import styles from './AdminTableBody.module.scss';
import BodyCell from './BodyCell';

interface IAdminTableBodyProps {
  rows: IAdminTableRow[];
  columns: IAdminTableColumn[];
  isSorting?: boolean;
  setRows: (el: any) => void;
  isLoading?: boolean;
}

export const AdminTableBody: FC<IAdminTableBodyProps> = ({
  columns,
  rows,
  isSorting,
  setRows,
  isLoading,
}) => {
  if (isLoading) {
    return <SkeletonLoader count={10} className='h-10 mb-2 rounded-2xl' />;
  }

  return (
    <ReactSortable
      className={styles.body}
      list={rows}
      setList={setRows}
      disabled={!isSorting}
      animation={300}
    >
      {rows.length ? (
        rows.map((row) => {
          return (
            <div
              draggable
              style={{ gridTemplateColumns: getTemplateColumns(columns) }}
              className={styles.row}
              key={row.id}
            >
              {columns.map((column) => {
                if (
                  column.formatter &&
                  typeof column.formatter === 'function'
                ) {
                  return (
                    <column.formatter
                      value={row[column.key]}
                      key={column.key}
                    />
                  );
                }

                return (
                  <BodyCell
                    width={column.width}
                    align={column.align}
                    key={column.key + row.id}
                    value={row[column.key]}
                  />
                );
              })}
            </div>
          );
        })
      ) : (
        <div className={styles.notFound}>Not found result 😑</div>
      )}
    </ReactSortable>
  );
};
