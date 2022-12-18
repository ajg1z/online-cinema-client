export interface ITableItem {
  _id: string;
  editURL: string;
  items: string[];
}

export interface IAdminTableItem {
  tableItem: ITableItem;
  removeHandler: (id: string) => void;
}

export interface IAdminTableProps {
  columns: any[];
  data: any[];
  isLoading: boolean;
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
