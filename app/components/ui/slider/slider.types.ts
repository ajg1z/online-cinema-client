import { IMovie } from './../../../shared/types/movie.types';

export interface ISlide extends Pick<IMovie, `_id` | `bigPoster`> {
  subTitle?: string;
  link: string;
  title?: string;
}
