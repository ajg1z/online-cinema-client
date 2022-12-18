import React, { ChangeEvent, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { parseClientDate } from '@/utils/date';
import { toastError } from '@/utils/toast-error';

import { DISCRETENESS } from '@/shared/types/date.types';

import movieService from '@/services/movie.service';

import useDebounce from '@/hooks/useDebounce';

import {
  ITableItem,
  IUserTableDataRow,
} from '@/components/ui/admin-table/table/admin-table.types';

import { userService } from '../../../../services/user.service';
import { convertMongoDate, formatDate } from '../../../../utils/date/index';

import { IMovieTableDataRow } from './../../../ui/admin-table/table/admin-table.types';

const useMovies = () => {
  const [searchTerm, setSearchTerm] = React.useState(``);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const queryData = useQuery(
    [`fetchMovies`, debouncedSearch],
    () => movieService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (movie): IMovieTableDataRow => ({
            action: {
              editUrl: PAGES_URL.admin(`movie/edit/${movie._id}`),
              id: movie._id,
            },
            id: movie._id,
            description: movie.description,
            name: movie.title,
            rating: movie.rating,
            genres: movie.genres.map((genre) => genre.name).join(`,`),
          }),
        ),
      onError: (error) => {
        toastError(error, `movie list`);
      },
    },
  );

  const { mutateAsync: deleteMovie } = useMutation(
    `delete movie`,
    (userId: string) => userService.deleteOne(userId),
    {
      onError: (error) => {
        toastError(error, `delete movie`);
      },

      onSuccess: (response) => {
        if (response.data.status) {
          toastr.success(`Delete movie`, `delete was successful`);
          queryData.refetch();
        }
      },
    },
  );

  return useMemo(
    () => ({
      ...queryData,
      handleSearch,
      searchTerm,
      deleteMovie,
    }),
    [queryData, searchTerm, deleteMovie],
  );
};

export default useMovies;
