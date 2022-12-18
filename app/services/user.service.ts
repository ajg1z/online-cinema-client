import { IRequestStatus } from 'api/api.types';

import { API_URL } from '@/config/api.config';

import { IUser } from '@/shared/types/user.types';

import axios from '../api/interceptors';

export const userService = {
  async getAll(query?: string) {
    return axios.get<IUser[]>(API_URL.user(`search`), {
      params: { query },
    });
  },

  async deleteOne(id: string) {
    return axios.delete<IRequestStatus>(API_URL.user(`${id}`));
  },
};
