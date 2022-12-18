import { errorCatch } from 'api/api.helpers';
import axios from 'axios';
import Cookies from 'js-cookie';

import { authService } from '@/services/auth/auth.service';

import {
  BASE_API_URL,
  JWT_EXPIRED,
  JWT_MUST_BE_PROVIDED,
} from './../config/api.config';
import { ACCESS_TOKEN } from './../config/constans';
import { removeUserFromStorage } from './../services/auth/auth.helper';
import { getContentType } from './api.helpers';

export const axiosClassic = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    ...getContentType(),
  },
});

export const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    ...getContentType(),
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = Cookies.get(ACCESS_TOKEN);

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === JWT_EXPIRED ||
        errorCatch(error) === JWT_MUST_BE_PROVIDED) &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === JWT_EXPIRED) removeUserFromStorage();
      }
    }

    throw error;
  },
);

export default instance;
