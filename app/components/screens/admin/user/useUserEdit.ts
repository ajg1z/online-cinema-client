import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { compareObj } from '@/utils/object/compare-object';
import { toastError } from '@/utils/toast-error';

import { IUser } from '@/shared/types/user.types';

import { IUserUpdate } from '@/services/user/user.service.types';

import { UserService } from './../../../../services/user/user.service';
import { IUserEditForm } from './user-edit.types';

export default function useUserEdit(setValue: UseFormSetValue<IUserEditForm>) {
  const { query, push } = useRouter();
  const [initUser, setInitUser] = useState<null | IUser>(null);

  const userId = String(query.id);

  const { isLoading } = useQuery(
    [`get user`, userId],
    () => UserService.getById(userId),
    {
      onError: (error) => {
        toastError(error, `Get user`);
      },

      onSuccess: ({ data }) => {
        setInitUser(data);
        setValue(`email`, data.email);
        setValue(`isAdmin`, data.isAdmin);
      },
      enabled: !!query.id,
    },
  );

  const { mutateAsync: update } = useMutation(
    `update user`,
    (data: IUserUpdate) => UserService.updateOne(userId, data),
    {
      onError: (error) => {
        toastError(error, `Update user`);
      },

      onSuccess: () => {
        toastr.success(`Update user`, `update was successful`);
        push(PAGES_URL.admin(`users`));
      },
    },
  );

  const onSubmit: SubmitHandler<IUserEditForm> = async (data) => {
    if (!initUser) return;

    const { isUpdate, payload } = compareObj<IUserUpdate>(data, initUser);

    if (!isUpdate) {
      toastr.info(`Not changes`, `Change something`);
      return;
    }

    await update(payload);
  };

  return {
    onSubmit,
    isLoading,
  };
}
