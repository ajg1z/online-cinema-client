import React, { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { toastError } from '@/utils/toast-error';

import { IUserTableDataRow } from '@/components/ui/admin-table/table/admin-table.types';

import { UserService } from '../../../../services/user/user.service';

import { useTypedSelector } from './../../../../hooks/useTypedSelector';
import { selectUser } from './../../../../store/user/selectors';
import { convertMongoDate } from './../../../../utils/date/index';

const useUsers = () => {
  const user = useTypedSelector(selectUser);
  const queryData = useQuery(`fetchUsers`, () => UserService.getAll(), {
    select: ({ data }) =>
      data
        .filter((el) => el._id !== user?._id)
        .map(
          (user): IUserTableDataRow => ({
            action: {
              editUrl: PAGES_URL.admin(`user/edit/${user._id}`),
              id: user._id,
            },
            email: user.email,
            isAdmin: user.isAdmin,
            id: user._id,
            dateRegister: convertMongoDate(user.createdAt),
          }),
        ),
    onError: (error) => {
      toastError(error, `user list`);
    },
  });

  const { mutateAsync: deleteUser } = useMutation(
    `delete user`,
    (userId: string) => UserService.deleteOne(userId),
    {
      onError: (error) => {
        toastError(error, `delete user`);
      },

      onSuccess: (response) => {
        if (response.data.status) {
          toastr.success(`Delete user`, `delete was successful`);
          queryData.refetch();
        }
      },
    },
  );

  return useMemo(
    () => ({
      ...queryData,
      deleteUser,
    }),
    [queryData, deleteUser],
  );
};

export default useUsers;
