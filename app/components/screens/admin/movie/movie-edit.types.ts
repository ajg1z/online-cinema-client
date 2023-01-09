import { IMovieParameters } from './../../../../shared/types/movie.types';

export interface IMovieEditForm {
  poster: string | File;
  bigPoster: string | File;
  title: string;
  description: string;
  slug: string;
  rating: number;
  countOpened: number;
  parameters: IMovieParameters;
  genres: string[];
  actors: string[];
  video: string | File;
}
