import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import Meta from '@/utils/meta/Meta';

import { UserRole } from '@/shared/types/user.types';
import { ROLES } from '@/shared/users.constans';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Button from '@/components/ui/form/Button';
import Field from '@/components/ui/form/Field';
import Heading from '@/components/ui/heading/Heading';
import RadioButton from '@/components/ui/radio-button/RadioButton';
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import styles from '../../../ui/form/admin-form.module.scss';

import useUserEdit from './useUserEdit';
import { IUserEditForm } from './user-edit.types';

const UserEdit = () => {
  const {
    setValue,
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<IUserEditForm>({ mode: `onBlur` });

  const { isLoading, onSubmit } = useUserEdit(setValue);

  const checkedRole = (role: UserRole, isAdmin: boolean) => {
    if (role === `admin` && isAdmin) return true;
    if (role === `user` && !isAdmin) return true;
    return false;
  };

  return (
    <Meta title='Edit User'>
      <AdminNavigation />
      <Heading>Edit User </Heading>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className={styles.fields}>
              <Field
                {...register(`email`, {
                  required: `Email is required`,
                })}
                placeholder='Email'
                error={errors.email}
                containerStyle={{ width: '50%' }}
              />
            </div>

            <div className={styles.radioButtons}>
              <Controller
                control={control}
                name='isAdmin'
                render={({ field }) => {
                  return (
                    <>
                      <div className='mb-2'>Roles</div>
                      {ROLES.map((role) => (
                        <RadioButton
                          checked={checkedRole(role, field.value)}
                          key={role}
                          label={role}
                          onChange={() => field.onChange(!field.value)}
                        />
                      ))}
                    </>
                  );
                }}
              />
            </div>
          </>
        )}
        <Button className={styles.submit}>Update</Button>
      </form>
    </Meta>
  );
};

export default UserEdit;
