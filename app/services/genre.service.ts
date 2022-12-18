import { IRequestStatus } from 'api/api.types';
import { axiosClassic } from 'api/interceptors';
import axios from 'api/interceptors';

import { API_URL } from '@/config/api.config';

import { IGenre } from '@/shared/types/movie.types';

export const genreService = {
  async getAll(params?: string) {
    return axiosClassic.get<IGenre[]>(API_URL.genre(), {
      params: { q: params },
    });
  },

  async getPopular() {
    return axiosClassic.get<IGenre[]>(API_URL.genre('popular'));
  },

  async deleteOne(id: string) {
    return axios.delete<IRequestStatus>(API_URL.genre(`${id}`));
  },
};

export default genreService;
