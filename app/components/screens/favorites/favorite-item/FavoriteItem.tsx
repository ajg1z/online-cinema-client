import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import NotFoundImg from '@/assets/images/notFoundImg.jpg';

import styles from '../Favorites.module.scss';
import FavoriteButton from '../favorite-button/FavoriteButton';
import { IFavoriteItemProps } from '../favorites.types';

const FavoriteItem: FC<{ item: IFavoriteItemProps }> = ({ item }) => {
  return (
    <div className={styles.itemWrapper}>
      <FavoriteButton movieId={item._id} />
      <Link className={styles.item} href={item.link}>
        <Image
          alt={item.name}
          src={item.posterPath || NotFoundImg}
          fill
          draggable={false}
          priority
        />
        <div className={styles.title}>{item.title}</div>
      </Link>
    </div>
  );
};

export default FavoriteItem;
