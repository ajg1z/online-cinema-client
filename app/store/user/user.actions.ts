import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorCatch } from 'api/api.helpers';
import { toastr } from 'react-redux-toastr';

import { JWT_EXPIRED } from '@/config/api.config';

import { toastError } from '@/utils/toast-error';

import { authService } from '@/services/auth/auth.service';

import { IAuthResponse, IUserInputOptions } from './user.types';

export const register = createAsyncThunk<IAuthResponse, IUserInputOptions>(
  `auth/register`,
  async (payload, thunkAPI) => {
    try {
      const { data } = await authService.register(payload);
      toastr.success(`Registration`, `Success Registration ✌️`);
      return data;
    } catch (e) {
      toastError(e);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const login = createAsyncThunk<IAuthResponse, IUserInputOptions>(
  `auth/login`,
  async (payload, thunkAPI) => {
    try {
      const { data } = await authService.login(payload);
      toastr.success(`Login`, `Success Login ✌️`);
      return data;
    } catch (e) {
      toastError(e);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const logout = createAsyncThunk(`auth/logout`, async () => {
  authService.logout();
});

export const checkAuth = createAsyncThunk(
  `auth/check-auth`,
  async (_, thunkAPI) => {
    try {
      const { data } = await authService.getNewTokens();
      return data;
    } catch (e) {
      if (errorCatch(e) === JWT_EXPIRED) {
        thunkAPI.dispatch(logout());
      }
      toastr.error(
        'Logout',
        'Your authorization is finished, plz sign in again',
      );
      return thunkAPI.rejectWithValue(e);
    }
  },
);
