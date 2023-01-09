import { IRequestStatus } from 'api/api.types';

import { API_URL } from '@/config/api.config';

import { IUser } from '@/shared/types/user.types';

import axios from '../../api/interceptors';

import { IMovie } from './../../shared/types/movie.types';
import { IUserUpdate } from './user.service.types';

export const UserService = {
  async getAll(query?: string) {
    return axios.get<IUser[]>(API_URL.user(`search`), {
      params: { query },
    });
  },

  async deleteOne(id: string) {
    return axios.delete<IRequestStatus>(API_URL.user(`${id}`));
  },

  async getById(id: string) {
    return axios.get<IUser>(API_URL.user(`${id}`));
  },

  async getProfile() {
    return axios.get<IUser>(API_URL.user(`profile`));
  },

  async updateProfile(data: IUserUpdate) {
    return axios.put<IUser>(API_URL.user(`profile`), data);
  },

  async updateOne(id: string, data: IUserUpdate) {
    return axios.put<IUser>(API_URL.user(`${id}`), data);
  },

  async getFavorites() {
    return axios.get<IMovie[]>(API_URL.user(`profile/favorites`));
  },

  async toggleFavorite(movieId: string) {
    return axios.put(API_URL.user(`profile/favorites`), { movieId });
  },
};
