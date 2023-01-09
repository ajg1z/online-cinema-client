import { SortDirection } from '@/shared/types/general.types';

export interface IAdminTableProps {
  columns: IAdminTableColumn[];
  rows: IAdminTableRow[];
  searchValue: string;
  filter?: (el: any) => boolean;
  isSortRows?: boolean;
  isLoading?: boolean;
  countRowsInPage?: number;
}

export interface IAdminTableColumn {
  title: string;
  key: string;
  sort?: boolean;
  align?: Align;
  titleAlign?: Align;
  width?: number;
  formatter?: any;
  sortFunction?: (
    rows: IAdminTableRow[],
    dir: SortDirection,
  ) => IAdminTableRow[];
}

export type ValueCell = string | number;

export interface IAdminTableRow {
  id: string | number;
  [key: string | number]: any;
}

export type Align = 'center' | 'right' | 'left';
