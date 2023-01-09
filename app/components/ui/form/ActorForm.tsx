import { FC } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import generateSlug from '@/utils/string/generateSlug';

import { IActorEditForm } from '@/components/screens/admin/actor/actor-edit.types';

import SkeletonLoader from '../skeleton-loader/SkeletonLoader';

import Button from './Button';
import Field from './Field';
import styles from './admin-form.module.scss';
import SlugField from './slug-field/SlugField';
import UploadField from './upload-field/UploadField';

interface IActorForm {
  isLoading?: boolean;
  onSubmit: (data: IActorEditForm) => void;
  form: UseFormReturn<IActorEditForm, any>;
  buttonText: string;
  submitLoading?: boolean;
}

const ActorForm: FC<IActorForm> = ({
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
              containerStyle={{ width: '48%' }}
            />

            <SlugField
              generate={() => {
                setValue(`slug`, generateSlug(getValues(`name`)));
              }}
              register={register}
              error={errors.slug}
              containerStyle={{ width: '48%' }}
            />
          </div>

          <Controller
            control={control}
            name='photo'
            rules={{
              required: `photo is required`,
            }}
            render={({ field, fieldState: { error } }) => (
              <UploadField
                onChange={field.onChange}
                value={Array.isArray(field.value) ? field.value[0] : undefined}
                error={error}
                folder='actor'
                type='image'
                placeholder='Photo'
                style={{ width: `48%` }}
              />
            )}
          />
        </>
      )}
      <Button disabled={submitLoading} className={styles.submit}>
        {buttonText}
      </Button>
    </form>
  );
};

export default ActorForm;
