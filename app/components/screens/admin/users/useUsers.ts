import React, { ChangeEvent, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { parseClientDate } from '@/utils/date';
import { toastError } from '@/utils/toast-error';

import { DISCRETENESS } from '@/shared/types/date.types';

import useDebounce from '@/hooks/useDebounce';

import {
  ITableItem,
  IUserTableDataRow,
} from '@/components/ui/admin-table/table/admin-table.types';

import { userService } from './../../../../services/user.service';
import { convertMongoDate, formatDate } from './../../../../utils/date/index';

const useUsers = () => {
  const [searchTerm, setSearchTerm] = React.useState(``);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const queryData = useQuery(
    [`fetchUsers`, debouncedSearch],
    () => userService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (user): IUserTableDataRow => ({
            action: {
              editUrl: PAGES_URL.admin(`user/edit/${user._id}`),
              id: user._id,
            },
            email: user.email,
            id: user._id,
            dateRegister: convertMongoDate(user.createdAt),
          }),
        ),
      onError: (error) => {
        toastError(error, `user list`);
      },
    },
  );

  const { mutateAsync: deleteUser } = useMutation(
    `delete user`,
    (userId: string) => userService.deleteOne(userId),
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
      handleSearch,
      searchTerm,
      deleteUser,
    }),
    [queryData, searchTerm, deleteUser],
  );
};

export default useUsers;
