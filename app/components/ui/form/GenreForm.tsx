import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, UseFormReturn, useForm } from 'react-hook-form';
import { stripHtml } from 'string-strip-html';

import generateSlug from '@/utils/string/generateSlug';

import { IGenreEditForm } from '@/components/screens/admin/genre/genre-edit.types';

import SkeletonLoader from '../skeleton-loader/SkeletonLoader';

import Button from './Button';
import Field from './Field';
import styles from './admin-form.module.scss';
import SlugField from './slug-field/SlugField';

const DynamicEditorText = dynamic(() => import('@/ui/form/TextEditor'), {
  ssr: false,
});

interface IGenreForm {
  isLoading?: boolean;
  onSubmit: (data: IGenreEditForm) => void;
  form: UseFormReturn<IGenreEditForm, any>;
  buttonText: string;
}

const GenreForm: FC<IGenreForm> = ({
  isLoading,
  onSubmit,
  form,
  buttonText,
}) => {
  const {
    setValue,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    control,
  } = form;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <div className={styles.fields}>
            <Field
              {...register(`name`, {
                required: `name is required`,
              })}
              placeholder='Name'
              error={errors.name}
              containerStyle={{ width: `31%` }}
            />

            <div style={{ width: `31%` }}>
              <SlugField
                generate={() => {
                  setValue(`slug`, generateSlug(getValues(`name`)));
                }}
                register={register}
                error={errors.slug}
              />
            </div>

            <Field
              {...register(`icon`, {
                required: `icon is required`,
              })}
              placeholder='Icon'
              error={errors.icon}
              containerStyle={{ width: `31%` }}
            />
          </div>

          <Controller
            control={control}
            name='description'
            defaultValue=''
            rules={{
              validate: {
                required: (v) =>
                  (v && stripHtml(v).result.length > 0) ||
                  `Description is required`,
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <DynamicEditorText
                  placeholder='Description'
                  value={field.value}
                  onChange={field.onChange}
                  error={error}
                />
              );
            }}
          />
        </>
      )}
      <Button className={styles.submit}>{buttonText}</Button>
    </form>
  );
};

export default GenreForm;
