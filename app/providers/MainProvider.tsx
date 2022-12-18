import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';
import { FCC } from '@/shared/types/react.types';

import { store } from '@/store/store';

import Layout from '@/components/layout/Layout';

import ReduxToastr from './ReduxToastr';
import AuthProvider from './auth-provider/AuthProvider';
import HeadProvider from './head-provider/HeadProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MainProvider: FCC<TypeComponentAuthFields> = ({
  children,
  Component,
}) => {
  return (
    <HeadProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReduxToastr />
          <AuthProvider Component={Component}>
            <Layout>{children}</Layout>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </HeadProvider>
  );
};

export default MainProvider;
