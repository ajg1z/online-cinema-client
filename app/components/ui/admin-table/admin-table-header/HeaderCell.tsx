import { Dispatch, FC, SetStateAction } from 'react';

import { SortDirection } from '@/shared/types/general.types';

import tableStyles from '../AdminTable.module.scss';
import { Align, IAdminTableRow, ValueCell } from '../admin-table.types';

export interface IHeaderCellProps {
  value: string | number;
  align?: Align;
  width?: number;
  sortFunction?: any;
  keyProp: string;
  sort?: boolean;
  rows: IAdminTableRow[];
  sortDirection: SortDirection;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  setRows: (row: IAdminTableRow[]) => void;
}

const HeaderCell: FC<IHeaderCellProps> = ({
  value,
  align,
  width,
  sortFunction,
  sort,
  rows,
  setRows,
  keyProp,
  setSortDirection,
  sortDirection,
}) => {
  const handleSort = () => {
    if (!sort) return;

    if (sortFunction) {
      setRows(sortFunction(rows.slice(), sortDirection));
    } else {
      const sortingRows = rows.slice().sort((a, b) => {
        const aVal: ValueCell = a[keyProp];
        const bVal: ValueCell = b[keyProp];

        if (typeof aVal === 'number' && typeof bVal === 'number')
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;

        return sortDirection === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });

      setRows(sortingRows);
    }

    setSortDirection((sort) => (sort === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div
      onClick={handleSort}
      className={tableStyles.cell}
      style={{
        width,
        textAlign: align ?? 'left',
        cursor: sort ? 'pointer' : 'auto',
      }}
    >
      {value}
    </div>
  );
};

export default HeaderCell;
