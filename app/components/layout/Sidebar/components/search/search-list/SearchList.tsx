import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { PAGES_URL } from '@/config/url.config';

import NotFoundImg from '@/assets/images/notFoundImg.jpg';

import { IMovie } from '@/shared/types/movie.types';

import styles from './SearchList.module.scss';

interface ISearchListProps {
  movies: IMovie[];
}

const SearchList: FC<ISearchListProps> = ({ movies = [] }) => {
  const renderedMovies = movies.map((movie) => {
    return (
      <Link href={PAGES_URL.movie(movie.slug)} key={movie._id}>
        <Image
          src={movie.poster || NotFoundImg}
          width={50}
          height={50}
          alt={movie.title}
          draggable='false'
          className='object-cover object-top'
        />
        <span>{movie.title}</span>
      </Link>
    );
  });

  return (
    <div className={styles.list}>
      {renderedMovies}
      {!movies.length && (
        <p className='py-3 text-center'>Movies not found 😞</p>
      )}
    </div>
  );
};

export default SearchList;
