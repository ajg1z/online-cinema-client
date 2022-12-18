import { createSlice } from '@reduxjs/toolkit';

import { USER_STORAGE } from '@/config/constans';

import { getStoreLocal } from '@/utils/local-storage';

import { checkAuth, login, logout, register } from './user.actions';
import { IInitialState } from './user.types';

const initialState: IInitialState = {
  user: getStoreLocal(USER_STORAGE),
  isLoading: false,
};

export const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // * register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });

    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
    });

    // * login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });

    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
    });

    // * logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });

    // * check-auth
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { reducer } = userSlice;
