import { IRequestStatus } from 'api/api.types';

import { API_URL } from '@/config/api.config';

import { IActor } from '@/shared/types/movie.types';

import axios, { axiosClassic } from '../../api/interceptors';

import { IActorEditForm } from './../../components/screens/admin/actor/actor-edit.types';
import { IActorUpdate } from './actor.service.types';

export const ActorService = {
  async getAll(query?: string) {
    return axios.get<IActor[]>(API_URL.actor(), {
      params: { query },
    });
  },
  async deleteOne(id: string) {
    return axios.delete<IRequestStatus>(API_URL.actor(`${id}`));
  },

  async getById(id: string) {
    return axios.get<IActor>(API_URL.actor(`${id}`));
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IActor>(API_URL.actor(`by-slug/${slug}`));
  },

  async updateOne(id: string, payload: IActorUpdate) {
    return axios.put<IActor>(API_URL.actor(`${id}`), payload);
  },

  async create(payload: IActorEditForm) {
    return axios.post<IActor>(API_URL.actor(`create`), payload);
  },
};
