import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';

import MovieService from '@/services/movie/movie.service';

import useDebounce from '@/hooks/useDebounce';

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isSuccess } = useQuery(
    ['search', debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      enabled: !!debouncedSearch,
      select: ({ data }) => data,
    },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return { handleChange, isSuccess, data, searchTerm };
};

export default useSearch;
