import React, { ChangeEvent, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { parseClientDate } from '@/utils/date';
import { toastError } from '@/utils/toast-error';

import { DISCRETENESS } from '@/shared/types/date.types';

import genreService from '@/services/genre.service';

import useDebounce from '@/hooks/useDebounce';

import {
  IGenreTableDataRow,
  ITableItem,
  IUserTableDataRow,
} from '@/components/ui/admin-table/table/admin-table.types';

import { userService } from '../../../../services/user.service';
import { convertMongoDate, formatDate } from '../../../../utils/date/index';

const useGenres = () => {
  const [searchTerm, setSearchTerm] = React.useState(``);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const queryData = useQuery(
    [`fetchGenres`, debouncedSearch],
    () => genreService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (genre): IGenreTableDataRow => ({
            action: {
              editUrl: PAGES_URL.admin(`genre/edit/${genre._id}`),
              id: genre._id,
            },
            name: genre.name,
            slug: genre.slug,
            description: genre.description,
            id: genre._id,
          }),
        ),
      onError: (error) => {
        toastError(error, `genre list`);
      },
    },
  );

  const { mutateAsync: deleteGenre } = useMutation(
    `delete genre`,
    (userId: string) => userService.deleteOne(userId),
    {
      onError: (error) => {
        toastError(error, `delete genre`);
      },

      onSuccess: (response) => {
        if (response.data.status) {
          toastr.success(`Delete genre`, `delete was successful`);
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
      deleteGenre,
    }),
    [queryData, searchTerm, deleteGenre],
  );
};

export default useGenres;
