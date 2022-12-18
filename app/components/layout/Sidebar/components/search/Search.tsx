import { useEffect, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';

import SearchField from '@/components/ui/search-field/SearchField';

import styles from './Search.module.scss';
import SearchList from './search-list/SearchList';
import useSearch from './useSearch';

const Search = () => {
  const { data, handleChange, isSuccess, searchTerm } = useSearch();

  return (
    <div className={styles.search}>
      <SearchField handleChange={handleChange} value={searchTerm} />
      {isSuccess && <SearchList movies={data ?? []} />}
    </div>
  );
};

export default Search;
