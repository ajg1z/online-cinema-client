import { FC, useState } from 'react';

import { SortDirection } from '@/shared/types/general.types';

import { IAdminTableColumn, IAdminTableRow } from '../admin-table.types';
import { getTemplateColumns } from '../getTemplateColumns';

import styles from './AdminTableHeader.module.scss';
import HeaderCell from './HeaderCell';

interface IAdminTableHeaderProps {
  columns: IAdminTableColumn[];
  rows: IAdminTableRow[];
  setRows: (row: IAdminTableRow[]) => void;
}

const AdminTableHeader: FC<IAdminTableHeaderProps> = ({
  columns,
  rows,
  setRows,
}) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  return (
    <div
      style={{
        gridTemplateColumns: getTemplateColumns(columns),
      }}
      className={styles.header}
    >
      {columns.map((column) => {
        return (
          <HeaderCell
            setSortDirection={setSortDirection}
            sortDirection={sortDirection}
            rows={rows}
            setRows={setRows}
            keyProp={column.key}
            sort={column.sort}
            sortFunction={column.sortFunction}
            width={column.width}
            value={column.title}
            align={column.titleAlign}
            key={column.key}
          />
        );
      })}
    </div>
  );
};

export default AdminTableHeader;
