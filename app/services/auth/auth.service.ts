import { getContentType } from 'api/api.helpers';
import { axiosClassic } from 'api/interceptors';
import Cookies from 'js-cookie';

import { API_URL } from '@/config/api.config';
import { REFRESH_TOKEN, USER_STORAGE } from '@/config/constans';

import {
  IAuthResponse,
  IUserInputOptions,
} from './../../store/user/user.types';
import { removeUserFromStorage, saveToStorage } from './auth.helper';

export const authService = {
  async register(payload: IUserInputOptions) {
    const response = await axiosClassic.post<IAuthResponse>(
      API_URL.auth(`register`),
      payload,
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
  async login(payload: IUserInputOptions) {
    const response = await axiosClassic.post<IAuthResponse>(
      API_URL.auth(`login`),
      payload,
    );

    if (response.data.accessToken) saveToStorage(response.data);
    return response;
  },

  logout() {
    removeUserFromStorage();
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(REFRESH_TOKEN);

    const response = await axiosClassic.post<IAuthResponse>(
      API_URL.auth(`login/access-token`),
      { refreshToken },
      { headers: getContentType() },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
