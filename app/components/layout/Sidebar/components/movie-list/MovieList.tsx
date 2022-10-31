import Link from 'next/link';
import { FC } from 'react';

import MovieElem from './MovieElem';
import styles from './MovieList.module.scss';
import { IMovieListProps } from './movie-list.types';

const MovieList: FC<IMovieListProps> = ({ movies, title, link }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      {movies.map((movie) => {
        return <MovieElem {...movie} key={movie._id} />;
      })}

      <Link className={styles.btn} href={link}>
        Sea more
      </Link>
    </div>
  );
};

export default MovieList;
