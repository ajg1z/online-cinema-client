import { IRequestStatus } from 'api/api.types';
import { axiosClassic } from 'api/interceptors';
import axios from 'api/interceptors';

import { API_URL } from '@/config/api.config';

import { IMovie } from '@/shared/types/movie.types';

import { IMovieEditForm } from '@/components/screens/admin/movie/movie-edit.types';

import { IMovieGetById, IMovieUpdate } from './movie.service.types';

export const MovieService = {
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

  async updateOne(id: string, payload: IMovieUpdate) {
    return axios.put<IMovie>(API_URL.movie(`${id}`), payload);
  },

  async getById(id: string) {
    return axios.get<IMovieGetById>(API_URL.movie(`${id}`));
  },

  async getByGenres(genres: string[]) {
    return axios.post<IMovie[]>(API_URL.movie(`by-genres`), { genres });
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IMovie>(API_URL.movie(`by-slug/${slug}`));
  },

  async getByActor(id: string) {
    return axios.get<IMovie[]>(API_URL.movie(`by-actors/${id}`));
  },

  async updateOpenedCount(slug: string) {
    return axiosClassic.put(API_URL.movie(`update-count-opened`), { slug });
  },

  async create(payload: IMovieEditForm) {
    return axios.post<IMovie>(API_URL.movie(`create`), payload);
  },
};

export default MovieService;
