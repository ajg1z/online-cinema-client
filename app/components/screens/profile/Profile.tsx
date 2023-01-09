import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Meta from '@/utils/meta/Meta';
import { compareObj } from '@/utils/object/compare-object';

import { IUserUpdate } from '@/services/user/user.service.types';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { selectUser } from '@/store/user/selectors';

import Button from '@/components/ui/form/Button';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import AuthFields from '../auth/AuthFields';

import styles from './Profile.module.scss';
import { IProfileEditForm } from './profile.types';
import { useProfile } from './useProfile';

const Profile: FC = () => {
  const user = useTypedSelector(selectUser);

  const { register, handleSubmit, formState, setValue } =
    useForm<IProfileEditForm>({
      mode: `onChange`,
    });

  const { isLoading, initProfile, updateProfile } = useProfile(setValue);

  const onSubmit: SubmitHandler<IProfileEditForm> = (data) => {
    if (initProfile) {
      const { isUpdate, payload } = compareObj<IUserUpdate>(data, initProfile);

      if (isUpdate) updateProfile(payload);
    }
  };

  return (
    <Meta title='Profile'>
      <Heading className='mb-5'>Profile - {user?.email}</Heading>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {isLoading ? (
          <SkeletonLoader count={2} />
        ) : (
          <AuthFields register={register} formState={formState} />
        )}

        <Button className='px-2 py-1'>Update</Button>
      </form>
    </Meta>
  );
};

export default Profile;
