import { IMovieParameters } from '@/shared/types/movie.types';

export interface IMovieUpdate {
  poster?: string;
  bigPoster?: string;
  title?: string;
  description?: string;
  slug?: string;
  rating?: number;
  countOpened?: number;
  parameters?: IMovieParameters;
  genres?: string[];
  actors?: string[];
  video?: string;
}

export interface IMovieGetById {
  poster: string;
  bigPoster: string;
  title: string;
  description: string;
  slug: string;
  rating: number;
  countOpened: number;
  parameters: IMovieParameters;
  genres: string[];
  actors: string[];
  video: string;
  _id: string;
}
