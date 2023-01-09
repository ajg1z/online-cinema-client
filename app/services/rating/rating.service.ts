import axios from 'api/interceptors';

import { API_URL } from '@/config/api.config';

export const RatingService = {
  async setRating(movieId: string, rating: number) {
    return axios.post<number>(API_URL.rating(`set-rating`), {
      movieId,
      value: rating,
    });
  },

  async getByUserMovie(movieId: string) {
    return axios.get<number>(API_URL.rating(`${movieId}`));
  },
};

export default RatingService;
