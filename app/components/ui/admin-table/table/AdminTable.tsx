import React, { useEffect, useState } from 'react';
import 'react-table';
import { useGlobalFilter, useTable } from 'react-table';

import SkeletonLoader from '../../skeleton-loader/SkeletonLoader';

import styles from './AdminTable.module.scss';
import AdminTableBody from './AdminTableBody';
import AdminTableHeader from './AdminTableHeader';
import { IAdminTableProps } from './admin-table.types';

const AdminTable: React.FC<IAdminTableProps> = ({
  columns,
  data,
  removeHandler,
  isLoading,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({ columns, data });

  const [countRows, setCountRows] = useState(rows.length);

  useEffect(() => {
    if (rows.length) setCountRows(rows.length);
  }, [rows]);

  if (isLoading) {
    return <SkeletonLoader count={countRows} />;
  }

  if (!rows.length)
    return (
      <div className={styles.notFound}>Nothing found for your input 😞</div>
    );

  return (
    <div className={styles.container}>
      <table {...getTableProps()}>
        <AdminTableHeader headerGroups={headerGroups} />
        <AdminTableBody
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
          rows={rows}
          removeHandler={removeHandler}
        />
      </table>
    </div>
  );
};

export default AdminTable;
