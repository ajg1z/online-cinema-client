import { IMovie } from './../../../shared/types/movie.types';

export interface ICatalogProps {
  movies: IMovie[];
  description?: string;
  title: string;
}
