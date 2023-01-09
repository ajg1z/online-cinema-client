import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { toastError } from '@/utils/toast-error';

import GenreService from '@/services/genre/genre.service';

import { IGenreTableDataRow } from '@/components/ui/admin-table/table/admin-table.types';

import { IGenreEditForm } from '../genre/genre-edit.types';

const useGenres = () => {
  const queryData = useQuery(`fetchGenres`, () => GenreService.getAll(), {
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
  });

  const { mutateAsync: deleteGenre } = useMutation(
    `delete genre`,
    (userId: string) => GenreService.deleteOne(userId),
    {
      onError: (error) => {
        toastError(error, `delete genre`);
      },

      onSuccess: () => {
        toastr.success(`Delete genre`, `delete was successful`);
        queryData.refetch();
      },
    },
  );

  const { mutateAsync: createGenre } = useMutation(
    `create genre`,
    (payload: IGenreEditForm) => GenreService.create(payload),
    {
      onSuccess: () => {
        toastr.success(`Create genre`, `create was successful`);
        queryData.refetch();
      },
    },
  );

  return useMemo(
    () => ({
      ...queryData,
      deleteGenre,
      createGenre,
    }),
    [queryData, deleteGenre, createGenre],
  );
};

export default useGenres;
