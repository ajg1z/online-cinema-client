import { axiosClassic } from 'api/interceptors';

import { Url } from '@/config/api.config';

import { IGenre } from '@/shared/types/genre.types';

export const genreService = {
  async getPopularGenres(limit: number = 4) {
    return axiosClassic.get<IGenre[]>(Url.genre('/popular'), {
      params: { limit },
    });
  },
};

export default genreService;
