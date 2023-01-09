import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { toastError } from '@/utils/toast-error';

import { FileService } from '@/services/file.service';

import { ActorService } from '../../../../services/actor-service/actor.service';

import { IActorTableDataRow } from './../../../ui/admin-table/table/admin-table.types';
import { IActorEditForm } from './../actor/actor-edit.types';

const useActors = () => {
  const queryData = useQuery(`fetchActors`, () => ActorService.getAll(), {
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
  });

  const { mutateAsync: deleteActor } = useMutation(
    `delete actor`,
    (userId: string) => ActorService.deleteOne(userId),
    {
      onError: (error) => {
        toastError(error, `delete actor`);
      },

      onSuccess: (response) => {
        if (response.status === 200) {
          toastr.success(`Delete actor`, `delete was successful`);
          queryData.refetch();
        }
      },
    },
  );

  const { mutateAsync: upload } = useMutation(`upload file`, (data: FormData) =>
    FileService.upload(data, 'actor'),
  );

  const { mutateAsync: createActor } = useMutation(
    `create actor`,
    async (data: IActorEditForm) => {
      const formData = new FormData();
      formData.append(`files`, data.photo as File);
      const { data: fileIds } = await upload(formData);

      return ActorService.create({ ...data, photo: fileIds });
    },
    {
      onSuccess: () => {
        toastr.success(`Create actor`, `create was successful`);
        queryData.refetch();
      },
    },
  );

  return useMemo(
    () => ({
      ...queryData,
      deleteActor,
      upload,
      createActor,
    }),
    [queryData, deleteActor, createActor, upload],
  );
};

export default useActors;
