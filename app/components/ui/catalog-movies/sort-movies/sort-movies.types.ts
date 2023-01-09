import { IMovie } from './../../../../shared/types/movie.types';

export interface ISortMovie {
  type: 'rating' | 'countOpened';
  dir: 'asc' | 'desc';
}

export interface ISortMoviesProps {
  setMovies: (value: IMovie[]) => void;
  movies: IMovie[];
  handleSearch: (value: string) => void;
}
