import React, { FC } from 'react';
import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table';

import SkeletonLoader from '../../skeleton-loader/SkeletonLoader';

import styles from './AdminTable.module.scss';
import AdminAction from './admin-action/AdminAction';

interface IAdminTableBodyProps {
  rows: Row[];
  prepareRow: (row: Row<{}>) => void;
  removeHandler: (id: string) => void;
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<{}> | undefined,
  ) => TableBodyProps;
}

const AdminTableBody: FC<IAdminTableBodyProps> = ({
  prepareRow,
  rows,
  removeHandler,
  getTableBodyProps,
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()} key={cell.value}>
                  {typeof cell.value === `object` ? (
                    <AdminAction
                      id={cell.value.id}
                      editUrl={cell.value.editUrl}
                      removeHandler={removeHandler}
                    />
                  ) : (
                    cell.render('Cell')
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default AdminTableBody;
