import { IFile } from './file.types';
import { TypeMaterialIconName } from './icon.types';

export interface IGenre {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: TypeMaterialIconName;
}

export interface IMovieParameters {
  year: number;
  duration: number;
  country: string;
}

export interface IActor {
  _id: string;
  slug: string;
  name: string;
  photo: string[];
  countMovies: number;
}

export interface IMovie {
  poster: string;
  bigPoster: string;
  title: string;
  description: string;
  slug: string;
  rating: number;
  countOpened: number;
  parameters: IMovieParameters;
  genres: IGenre[];
  actors: IActor[];
  video: string;
  _id: string;
}
