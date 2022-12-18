import axios from 'api/interceptors';

import { API_URL } from '@/config/api.config';

export const adminService = {
  async getCountUsers() {
    return axios.get<number>(API_URL.user(`count`));
  },
};
