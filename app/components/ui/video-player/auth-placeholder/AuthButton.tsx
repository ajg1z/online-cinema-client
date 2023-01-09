import Link from 'next/link';
import { FC } from 'react';

import { PAGES_URL } from '@/config/url.config';

import styles from './AuthPlaceholder.module.scss';

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
  return (
    <Link
      href={PAGES_URL.auth(`?redirect=${PAGES_URL.movie(slug)}`)}
      className={styles.btn}
    >
      Sign in
    </Link>
  );
};

export default AuthButton;
