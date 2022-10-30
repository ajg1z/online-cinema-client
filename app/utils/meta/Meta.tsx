import Head from 'next/head';
import { useRouter } from 'next/router';

import { SiteName, titleMerge } from '@/config/seo.config';

import { FCC } from '@/shared/types/react.types';

import onlyText from '../string/onlyText';

import { IMetaProps } from './meta.types';

const Meta: FCC<IMetaProps> = ({ title, description, image, children }) => {
  const { asPath } = useRouter();
  const currentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${asPath}`;

  return (
    <>
      {description ? (
        <Head>
          <title itemProp='headline'>{titleMerge(title)}</title>
          <meta
            itemProp='description'
            name='description'
            content={onlyText(description, 152)}
          />
          <link rel='canonical' href={currentUrl} />
          <meta property='og:locale' content='en' />
          <meta property='og:title' content={titleMerge(title)} />
          <meta property='og:url' content={currentUrl} />
          <meta property='og:image' content={image} />
          <meta property='og:site_name' content={SiteName} />
          <meta
            property='og:description'
            content={onlyText(description, 197)}
          />
        </Head>
      ) : (
        <meta name='robots' content='noindex,nofollow' />
      )}
      {children}
    </>
  );
};

export default Meta;
