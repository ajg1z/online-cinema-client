import Link from 'next/link';
import { FC } from 'react';

import { PAGES_URL } from '@/config/url.config';

import CollectionImage from './CollectionImage';
import styles from './Collections.module.scss';
import { ICollection } from './collections.types';

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
  return (
    <Link className={styles.collection} href={PAGES_URL.genre(collection.slug)}>
      <CollectionImage collection={collection} />
      <div className={styles.content}>
        <div className={styles.title}>{collection.title}</div>
      </div>
    </Link>
  );
};

export default CollectionItem;
