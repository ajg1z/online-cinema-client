import Head from 'next/head';
import NextProgressbar from 'nextjs-progressbar';
import React from 'react';

import { accentColor } from '@/config/constans';

import { FCC } from '@/shared/types/react.types';

import Favicons from './Favicons';

const HeadProvider: FCC = ({ children }) => {
  return (
    <>
      <NextProgressbar
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        color={accentColor}
      />
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <Favicons />

        <meta name='theme-color' content={'#181B1E'} />
        <meta name='msapplication-navbutton-color' content={'#181B1E'} />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content={'#181B1E'}
        />
      </Head>
      {children}
    </>
  );
};

export default HeadProvider;
