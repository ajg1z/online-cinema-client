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

export interface ITableItem {
  _id: string;
  editURL: string;
  items: string[];
}

export interface IAdminTableItem {
  tableItem: ITableItem;
  removeHandler: (id: string) => void;
}

interface IActionCell {
  id: string;
  editUrl: string;
}

export interface IUserTableDataRow {
  email: string;
  dateRegister: string;
  action: IActionCell;
  id: string;
}

export interface IActorTableDataRow {
  id: string;
  name: string;
  countMovies: number;
  action: IActionCell;
}

export interface IMovieTableDataRow {
  id: string;
  name: string;
  rating: number;
  genres: string;
  action: IActionCell;
  description: string;
}

export interface IGenreTableDataRow {
  id: string;
  name: string;
  action: IActionCell;
  description: string;
  slug: string;
}
