import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import generateSlug from '@/utils/string/generateSlug';

import { IFile } from '@/shared/types/file.types';

import { IMovieEditForm } from '@/components/screens/admin/movie/movie-edit.types';
import { useAdminActor } from '@/components/screens/admin/movie/useAdminActor';
import { useAdminGenre } from '@/components/screens/admin/movie/useAdminGenre';

import SkeletonLoader from '../skeleton-loader/SkeletonLoader';

import Button from './Button';
import Field from './Field';
import styles from './admin-form.module.scss';
import SlugField from './slug-field/SlugField';
import UploadField from './upload-field/UploadField';

export const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false,
});

interface IMovieForm {
  isLoading?: boolean;
  onSubmit: (data: IMovieEditForm) => void;
  form: UseFormReturn<IMovieEditForm, any>;
  buttonText: string;
  submitLoading?: boolean;
}

const MovieForm: FC<IMovieForm> = ({
  isLoading,
  onSubmit,
  form,
  buttonText,
  submitLoading,
}) => {
  const {
    setValue,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    control,
  } = form;

  const { data: actors, isLoading: isActorLoading } = useAdminActor();
  const { data: genres, isLoading: isGenreLoading } = useAdminGenre();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <div className={styles.fields}>
            <Field
              {...register(`title`, {
                required: `title is required`,
              })}
              placeholder='Title'
              error={errors.title}
              containerStyle={{ width: `48%` }}
            />

            <SlugField
              generate={() => {
                setValue(`slug`, generateSlug(getValues(`title`)));
              }}
              register={register}
              containerStyle={{ width: `48%` }}
              error={errors.slug}
            />

            <Field
              {...register(`parameters.country`, {
                required: `country is required`,
              })}
              placeholder='Country'
              error={errors.parameters?.country}
            />

            <Field
              {...register(`parameters.duration`, {
                required: `duration is required`,
              })}
              placeholder='Duration'
              error={errors.parameters?.duration}
            />

            <Field
              {...register(`parameters.year`, {
                required: `year is required`,
              })}
              placeholder='Year'
              error={errors.parameters?.year}
            />

            <Controller
              control={control}
              name='genres'
              rules={{
                required: `Please select at least one genre!`,
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <DynamicSelect
                    field={field}
                    options={genres ?? []}
                    error={error}
                    isLoading={isGenreLoading}
                    isMulti
                    placeholder='Genres'
                    containerStyle={{ width: `48%` }}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name='actors'
              rules={{
                required: `Please select at least one actor!`,
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <DynamicSelect
                    field={field}
                    options={actors ?? []}
                    error={error}
                    isLoading={isActorLoading}
                    isMulti
                    placeholder='Actors'
                    containerStyle={{ width: `48%` }}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name='poster'
              rules={{
                required: `Poster is required`,
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <UploadField
                    onChange={field.onChange}
                    value={
                      typeof field.value !== 'string' ? undefined : field.value
                    }
                    error={error}
                    folder='movie'
                    type='image'
                    placeholder='Poster'
                    style={{ width: `48%` }}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name='bigPoster'
              rules={{
                required: `BigPoster is required`,
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <UploadField
                    onChange={field.onChange}
                    value={
                      typeof field.value !== 'string' ? undefined : field.value
                    }
                    error={error}
                    folder='movie'
                    type='image'
                    placeholder='Big poster'
                    style={{ width: `48%` }}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name='video'
              rules={{
                required: `Video is required`,
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <UploadField
                    onChange={field.onChange}
                    value={
                      typeof field.value !== 'string' ? undefined : field.value
                    }
                    error={error}
                    folder='movie'
                    isNoImage
                    type='video'
                    placeholder='Video'
                    style={{ width: `48%` }}
                  />
                );
              }}
            />
          </div>
        </>
      )}
      <Button disabled={submitLoading} className={styles.submit}>
        {buttonText}
      </Button>
    </form>
  );
};

export default MovieForm;
