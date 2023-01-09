import { UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { toastError } from '@/utils/toast-error';

import { IUserUpdate } from '@/services/user/user.service.types';

import { useActions } from '@/hooks/useActions';

import { UserService } from '../../../services/user/user.service';

import { IProfileEditForm } from './profile.types';

export function useProfile(setValue: UseFormSetValue<IProfileEditForm>) {
  const { updateUser } = useActions();

  const { data, isLoading } = useQuery(`get profile`, UserService.getProfile, {
    onError: (error) => {
      toastError(error, `Update profile`);
    },
    onSuccess: ({ data }) => {
      setValue(`email`, data.email);
    },
  });

  const { mutateAsync: updateProfile } = useMutation(
    `update profile`,
    (data: IUserUpdate) => UserService.updateProfile(data),
    {
      onError: (error) => {
        toastError(error, `Update profile`);
      },
      onSuccess({ data }) {
        updateUser(data);
        toastr.success(`Update profile`, `update was successful`);
      },
    },
  );

  return {
    updateProfile,
    isLoading,
    initProfile: data?.data,
  };
}
