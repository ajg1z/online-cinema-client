import { FC, memo, useEffect, useState } from 'react';

import styles from './AdminTable.module.scss';
import { AdminTableBody } from './admin-table-body/AdminTableBody';
import AdminTableFooter from './admin-table-footer/AdminTableFooter';
import AdminTableHeader from './admin-table-header/AdminTableHeader';
import { IAdminTableProps } from './admin-table.types';
import { usePagesIndex } from './usePagesIndex';

const AdminTable: FC<IAdminTableProps> = ({
  columns = [],
  rows = [],
  searchValue,
  isSortRows,
  isLoading,
  filter,
  countRowsInPage = 10,
}) => {
  const [localRows, setLocalRows] = useState(rows);
  const [localColumns, setLocalColumns] = useState(columns);

  const { countPage, currentPage, isNextPage, isPrevPage, nextPage, prevPage } =
    usePagesIndex(rows, countRowsInPage, searchValue, filter);

  useEffect(() => {
    setLocalColumns(columns);
  }, [columns]);

  useEffect(() => {
    const start = currentPage * countRowsInPage;
    const end = (currentPage + 1) * countRowsInPage;

    if (searchValue && filter) {
      setLocalRows(rows.filter((el) => filter(el)).slice(start, end));
    } else {
      setLocalRows(rows.slice(start, end));
    }
  }, [searchValue, filter, rows, currentPage, countRowsInPage]);

  return (
    <div className={styles.wrapper}>
      <AdminTableHeader
        setRows={setLocalRows}
        rows={localRows}
        columns={localColumns}
      />

      <AdminTableBody
        setRows={setLocalRows}
        columns={localColumns}
        isSorting={isSortRows}
        rows={localRows}
        isLoading={isLoading}
      />

      <AdminTableFooter
        isNextPage={isNextPage}
        isPrevPage={isPrevPage}
        next={nextPage}
        prev={prevPage}
        countPage={countPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default memo(AdminTable);
