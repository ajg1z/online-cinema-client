import { IRequestStatus } from 'api/api.types';
import { axiosClassic } from 'api/interceptors';
import axios from 'api/interceptors';

import { API_URL } from '@/config/api.config';

import { IMovie } from '@/shared/types/movie.types';

export const movieService = {
  async getAll(query?: string) {
    return axiosClassic.get<IMovie[]>(API_URL.movie(), {
      params: { query },
    });
  },

  async getPopular() {
    const { data } = await axiosClassic.get<IMovie[]>(
      API_URL.movie('most-popular'),
    );
    return data;
  },

  async deleteOne(id: string) {
    return axios.delete<IRequestStatus>(API_URL.movie(`${id}`));
  },
};

export default movieService;
