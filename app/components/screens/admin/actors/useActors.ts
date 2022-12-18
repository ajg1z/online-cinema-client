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

import { actorService } from './../../../../services/actor.service';
import { IActorTableDataRow } from './../../../ui/admin-table/table/admin-table.types';

const useActors = () => {
  const [searchTerm, setSearchTerm] = React.useState(``);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const queryData = useQuery(
    [`fetchActors`, debouncedSearch],
    () => actorService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (actor): IActorTableDataRow => ({
            action: {
              editUrl: PAGES_URL.admin(`actor/edit/${actor._id}`),
              id: actor._id,
            },
            countMovies: actor.countMovies,
            name: actor.name,
            id: actor._id,
          }),
        ),
      onError: (error) => {
        toastError(error, `actor list`);
      },
    },
  );

  const { mutateAsync: deleteActor } = useMutation(
    `delete actor`,
    (userId: string) => actorService.deleteOne(userId),
    {
      onError: (error) => {
        toastError(error, `delete actor`);
      },

      onSuccess: (response) => {
        if (response.data.status) {
          toastr.success(`Delete actor`, `delete was successful`);
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
      deleteActor,
    }),
    [queryData, searchTerm, deleteActor],
  );
};

export default useActors;
