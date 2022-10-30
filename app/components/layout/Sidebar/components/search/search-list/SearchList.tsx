import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { pages } from '@/config/url.config';

import { IMovie } from '@/shared/types/movie.types';

import styles from './SearchList.module.scss';

interface ISearchListProps {
  movies: IMovie[];
}

const SearchList: FC<ISearchListProps> = ({ movies = [] }) => {
  return (
    <div className={styles.list}>
      {movies.map((movie) => {
        return (
          <Link href={pages.movie(movie.slug)} key={movie._id}>
            <Image
              src={movie.poster}
              width={50}
              height={50}
              alt={movie.title}
              draggable='false'
              className='object-cover object-top'
            />
            <span>{movie.title}</span>
          </Link>
        );
      })}

      {!movies.length && (
        <p className='py-3 text-center'>Movies not found 😞</p>
      )}
    </div>
  );
};

export default SearchList;
