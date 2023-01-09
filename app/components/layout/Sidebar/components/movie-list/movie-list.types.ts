import { IMovie } from './../../../../../shared/types/movie.types';

export interface IMovieListProps {
  title: string;
  movies: IMovie[];
  link: string;
  textInNotMovies?: string;
  hideLink?: boolean;
}
