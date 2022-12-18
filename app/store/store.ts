import { configureStore } from '@reduxjs/toolkit';

import reducer from './root-reducer';

export const store = configureStore({
  reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
