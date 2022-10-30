import { axiosClassic } from 'api/interceptors';

import { Url } from '@/config/api.config';

import { IMovie } from '@/shared/types/movie.types';

export const movieService = {
  async getAll(query?: string) {
    return axiosClassic.get<IMovie[]>(Url.movie(), {
      params: { query },
    });
  },
};

export default movieService;
