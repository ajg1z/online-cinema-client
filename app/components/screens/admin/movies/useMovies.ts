import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { toastError } from '@/utils/toast-error';

import { FileService } from '@/services/file.service';
import MovieService from '@/services/movie/movie.service';

import { IMovieTableDataRow } from '@/components/ui/admin-table/admin-table.types';

import { IMovieEditForm } from '../movie/movie-edit.types';

const useMovies = () => {
  const queryData = useQuery(`fetchMovies`, () => MovieService.getAll(), {
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
          genres: movie.genres.map((genre) => genre.name).join(`, `),
        }),
      ),
    onError: (error) => {
      toastError(error, `movie list`);
    },
  });

  const { mutateAsync: deleteMovie } = useMutation(
    `delete movie`,
    (userId: string) => MovieService.deleteOne(userId),
    {
      onError: (error) => {
        toastError(error, `delete movie`);
      },
      onSuccess: () => {
        toastr.success(`Delete movie`, `delete was successful`);
        queryData.refetch();
      },
    },
  );

  const { mutateAsync: upload } = useMutation(
    `upload file`,
    (data: FormData) => FileService.upload(data, 'movie'),
    {
      onError: (error) => {
        toastError(error, `Upload file`);
      },
    },
  );

  const { mutateAsync: createMovie } = useMutation(
    `create movie`,
    async (data: IMovieEditForm) => {
      toastr.info('Creating movie', 'Upload...', { timeOut: 0 });
      const bigPosterFormData = new FormData();
      bigPosterFormData.append(`files`, data.bigPoster as File);
      const {
        data: [bigPosterId],
      } = await upload(bigPosterFormData);

      data.bigPoster = bigPosterId;

      const posterFormData = new FormData();
      posterFormData.append(`files`, data.poster as File);
      const {
        data: [posterId],
      } = await upload(posterFormData);

      data.poster = posterId;

      const videoFormData = new FormData();
      videoFormData.append(`files`, data.video as File);
      const {
        data: [videoId],
      } = await upload(videoFormData);

      data.video = videoId;

      toastr.info('Creating movie', 'Creating...', { timeOut: 0 });

      await MovieService.create(data);
    },
    {
      onSuccess: () => {
        toastr.clean();
        toastr.success(`Create movie`, `create was successful`);
        queryData.refetch();
      },
    },
  );

  return useMemo(
    () => ({
      ...queryData,
      deleteMovie,
      createMovie,
    }),
    [queryData, deleteMovie, createMovie],
  );
};

export default useMovies;
