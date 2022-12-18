import type { AppProps } from 'next/app';
import MainProvider from 'providers/MainProvider';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import '@/assets/styles/globals.css';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';

export type TypeAppProps = AppProps & TypeComponentAuthFields;

export default function App({ Component, pageProps }: TypeAppProps) {
  return (
    <MainProvider Component={Component}>
      <Component {...pageProps} />
    </MainProvider>
  );
}
