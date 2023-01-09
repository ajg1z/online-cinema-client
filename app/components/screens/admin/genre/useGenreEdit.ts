import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { compareObj } from '@/utils/object/compare-object';
import { toastError } from '@/utils/toast-error';

import { IGenre } from '@/shared/types/movie.types';

import GenreService from '@/services/genre/genre.service';
import { IGenreUpdate } from '@/services/genre/genre.service.types';

import { getKeys } from './../../../../utils/object/getKeys';
import { IGenreEditForm } from './genre-edit.types';

export default function useGenreEdit(
  setValue: UseFormSetValue<IGenreEditForm>,
) {
  const { query, push } = useRouter();
  const [initGenre, setInitGenre] = useState<IGenre | null>(null);

  const genreId = String(query.id);

  const { isLoading } = useQuery(
    [`get genre`, genreId],
    () => GenreService.getById(genreId),
    {
      onError: (error) => {
        toastError(error, `Get genre`);
      },
      onSuccess: ({ data }) => {
        getKeys(data).forEach((key) => {
          if (key !== `_id`) setValue(key, data[key]);
        });
        setInitGenre(data);
      },
      enabled: !!query.id,
    },
  );

  const { mutateAsync } = useMutation(
    `update genre`,
    (data: IGenreUpdate) => GenreService.updateOne(genreId, data),
    {
      onError: (error) => {
        toastError(error, `Update genre`);
      },
      onSuccess: () => {
        toastr.success(`Update genre`, `update was successful`);
        push(PAGES_URL.admin(`genres`));
      },
    },
  );

  const onSubmit: SubmitHandler<IGenreEditForm> = async (data) => {
    if (!initGenre) return;
    const { isUpdate, payload } = compareObj(data, initGenre);
    if (!isUpdate) {
      toastr.info(`Not changes`, `Change something`);
      return;
    }

    await mutateAsync(payload);
  };

  return {
    onSubmit,
    isLoading,
  };
}
