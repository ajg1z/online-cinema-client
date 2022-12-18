import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { PAGES_URL } from '@/config/url.config';

import { getGenresListEach } from '@/utils/movie/helpers';

import { IMovie } from '@/shared/types/movie.types';

import MaterialIcon from '@/components/ui/material-icon/MaterialIcon';

import styles from './MovieList.module.scss';

const MovieElem: FC<IMovie> = ({ title, rating, poster, slug, genres }) => {
  const renderedGenres = genres.map((genre, index) => {
    return (
      <li key={genre._id}>
        <Link href={PAGES_URL.genre(genre.slug)}>
          {getGenresListEach(index, genres.length, genre.name)}
        </Link>
      </li>
    );
  });

  return (
    <div className={styles.movieItem}>
      <Link href={PAGES_URL.movie(slug)}>
        <Image width={65} height={97} alt={title} src={poster} priority />
      </Link>

      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <ul className={styles.genres}>{renderedGenres}</ul>
        <div className={styles.rating}>
          <MaterialIcon name='MdStarRate' />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieElem;
