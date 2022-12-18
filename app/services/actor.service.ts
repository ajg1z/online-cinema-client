import { IRequestStatus } from 'api/api.types';

import { API_URL } from '@/config/api.config';

import { IActor } from '@/shared/types/movie.types';
import { IUser } from '@/shared/types/user.types';

import axios from '../api/interceptors';

export const actorService = {
  async getAll(query?: string) {
    return axios.get<IActor[]>(API_URL.actor(), {
      params: { query },
    });
  },

  async deleteOne(id: string) {
    return axios.delete<IRequestStatus>(API_URL.actor(`${id}`));
  },
};
