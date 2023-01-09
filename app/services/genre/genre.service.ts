import { IRequestStatus } from 'api/api.types';
import { axiosClassic } from 'api/interceptors';
import axios from 'api/interceptors';

import { API_URL } from '@/config/api.config';

import { IGenre } from '@/shared/types/movie.types';

import { ICollection } from '@/components/screens/collections/collections.types';

import { IGenreEditForm } from './../../components/screens/admin/genre/genre-edit.types';
import { IGenreUpdate } from './genre.service.types';

export const GenreService = {
  async getAll(params?: string) {
    return await axiosClassic.get<IGenre[]>(API_URL.genre(), {
      params: { q: params },
    });
  },

  async getPopular() {
    return axiosClassic.get<IGenre[]>(API_URL.genre('popular'));
  },

  async deleteOne(id: string) {
    return axios.delete<IRequestStatus>(API_URL.genre(`${id}`));
  },

  async updateOne(id: string, payload: IGenreUpdate) {
    return axios.put<IGenre>(API_URL.genre(`${id}`), payload);
  },

  async getById(id: string) {
    return axios.get<IGenre>(API_URL.genre(`${id}`));
  },

  async getCollections() {
    return axiosClassic.get<ICollection[]>(API_URL.genre('collections'));
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IGenre>(API_URL.genre(`by-slug/${slug}`));
  },

  async create(payload: IGenreEditForm) {
    return axios.post<string>(API_URL.genre(`create`), payload);
  },
};

export default GenreService;
