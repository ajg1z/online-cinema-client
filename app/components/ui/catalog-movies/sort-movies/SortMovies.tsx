import cn from 'classnames';
import { ChangeEvent, FC, useState } from 'react';

import { useDebouncedEffect } from '@/hooks/useDebounceEffect';

import MaterialIcon from '../../material-icon/MaterialIcon';
import SearchField from '../../search-field/SearchField';

import styles from './SortMovies.module.scss';
import { ISortMovie, ISortMoviesProps } from './sort-movies.types';

const SortMovies: FC<ISortMoviesProps> = ({
  setMovies,
  movies,
  handleSearch,
}) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<ISortMovie>({ dir: 'asc', type: 'rating' });

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useDebouncedEffect(
    () => {
      handleSearch(search);
    },
    [search],
    500,
  );

  const handleSortMovies = (type: ISortMovie['type']) => {
    const slicedMovies = movies.slice();
    const dir = sort.dir === 'asc' ? 'desc' : 'asc';

    setSort({ type, dir });

    if (type === 'rating') {
      setMovies(
        slicedMovies.sort((a, b) =>
          dir === 'asc' ? a.rating - b.rating : b.rating - a.rating,
        ),
      );
    } else {
      setMovies(
        slicedMovies.sort((a, b) =>
          dir === 'asc'
            ? a.countOpened - b.countOpened
            : b.countOpened - a.countOpened,
        ),
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <SearchField handleChange={onSearch} value={search} />

      <div className={styles.sortBlock}>
        Sorting by:
        <button
          title='by rating'
          onClick={() => handleSortMovies('rating')}
          className={cn(styles.sortElem, {
            [styles.activeSort]: sort.type === 'rating',
          })}
        >
          <MaterialIcon name='MdStar' />
        </button>
        <button
          title='by countOpened'
          onClick={() => handleSortMovies('countOpened')}
          className={cn(styles.sortElem, {
            [styles.activeSort]: sort.type === 'countOpened',
          })}
        >
          <MaterialIcon name='MdPeople' />
        </button>
      </div>
    </div>
  );
};

export default SortMovies;
