import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { compareObj } from '@/utils/object/compare-object';
import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';

import { FileService } from '@/services/file.service';
import MovieService from '@/services/movie/movie.service';
import {
  IMovieGetById,
  IMovieUpdate,
} from '@/services/movie/movie.service.types';

import { IMovie } from './../../../../shared/types/movie.types';
import { IMovieEditForm } from './movie-edit.types';

export default function useMovieEdit(
  setValue: UseFormSetValue<IMovieEditForm>,
) {
  const { query, push } = useRouter();
  const [initMovie, setInitMovie] = useState<null | IMovieGetById>(null);

  const movieId = String(query.id);

  const { isLoading } = useQuery(
    [`get movie`, movieId],
    () => MovieService.getById(movieId),
    {
      onError: (error) => {
        toastError(error, `Get movie`);
      },
      onSuccess: ({ data }) => {
        setInitMovie(data);
        getKeys(data).forEach((key) => {
          if (key !== `_id`) setValue(key, data[key]);
        });
      },
      enabled: !!query.id,
    },
  );

  const { mutateAsync: update } = useMutation(
    `update movie`,
    (data: IMovieUpdate) => MovieService.updateOne(movieId, data),
    {
      onError: (error) => {
        toastError(error, `Update movie`);
      },
      onSuccess: () => {
        toastr.success(`Update movie`, `update was successful`);
        push(PAGES_URL.admin(`movies`));
      },
    },
  );

  const { mutateAsync: upload } = useMutation(
    `upload file`,
    ({ data, typeFile }: { data: FormData; typeFile: string }) =>
      FileService.upload(data, typeFile),
    {
      onError: (error) => {
        toastError(error, `Upload file`);
      },
    },
  );

  const onSubmit: SubmitHandler<IMovieEditForm> = async (data) => {
    if (!initMovie) return;

    const { isUpdate, payload } = compareObj<IMovieEditForm>(data, initMovie);

    if (!isUpdate) {
      toastr.info(`Not changes`, `Change something`);
      return;
    }

    if (payload.bigPoster) {
      const formData = new FormData();
      formData.append(`files`, payload.bigPoster as File);
      const {
        data: [fileId],
      } = await upload({ data: formData, typeFile: 'movie' });
      payload.bigPoster = fileId;
    }

    if (payload.poster) {
      const formData = new FormData();
      formData.append(`files`, payload.poster as File);
      const {
        data: [fileId],
      } = await upload({ data: formData, typeFile: 'movie' });
      payload.poster = fileId;
    }

    if (payload.video) {
      const formData = new FormData();
      formData.append(`files`, payload.video as File);
      const {
        data: [fileId],
      } = await upload({ data: formData, typeFile: 'movie' });
      payload.video = fileId;
    }

    await update(payload as IMovieUpdate);
  };

  return {
    onSubmit,
    isLoading,
  };
}
