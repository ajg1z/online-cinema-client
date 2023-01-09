import { IGenre } from './../../../../shared/types/movie.types';

export interface IGenreEditForm extends Omit<IGenre, `_id`> {}
