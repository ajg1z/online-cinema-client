import Cookie from 'js-cookie';

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_STORAGE } from '@/config/constans';

import { IAuthResponse, ITokens } from './../../store/user/user.types';

export const saveTokensToCookie = ({ accessToken, refreshToken }: ITokens) => {
  Cookie.set(ACCESS_TOKEN, accessToken);
  Cookie.set(REFRESH_TOKEN, refreshToken);
};

export const removeTokensCookie = () => {
  Cookie.remove(ACCESS_TOKEN);
  Cookie.remove(REFRESH_TOKEN);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensToCookie(data);
  localStorage.setItem(USER_STORAGE, JSON.stringify(data.user));
};

export const removeUserFromStorage = () => {
  removeTokensCookie();
  localStorage.removeItem(USER_STORAGE);
};
