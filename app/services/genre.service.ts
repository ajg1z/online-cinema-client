import { axiosClassic } from 'api/interceptors';

import { Url } from '@/config/api.config';

import { IGenre } from '@/shared/types/movie.types';

export const genreService = {
  async getAll(params?: string) {
    return axiosClassic.get<IGenre[]>(Url.genre(), {
      params: { q: params },
    });
  },
};

export default genreService;
