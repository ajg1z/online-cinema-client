import { IGenre } from '@/shared/types/movie.types';

export const getGenresListEach = (
  index: number,
  length: number,
  name: string,
) => {
  return index + 1 === length ? name : name + ',';
};

export function getGenreList(genres: IGenre[]) {
  return genres.map((mov) => mov.name).join(`,`);
}
