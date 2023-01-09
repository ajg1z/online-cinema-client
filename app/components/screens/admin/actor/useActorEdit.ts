import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { PAGES_URL } from '@/config/url.config';

import { isArrayString } from '@/utils/array/is-array-string';
import { getObjKeysLength } from '@/utils/object/getLengthKeys';
import { toastError } from '@/utils/toast-error';

import { FileType } from '@/shared/types/file.types';
import { IActor } from '@/shared/types/movie.types';

import { ActorService } from '@/services/actor-service/actor.service';
import { IActorUpdate } from '@/services/actor-service/actor.service.types';
import { FileService } from '@/services/file.service';

import { getKeys } from '../../../../utils/object/getKeys';

import { IActorEditForm } from './actor-edit.types';

export default function useActorEdit(
  setValue: UseFormSetValue<IActorEditForm>,
  typeFile: FileType,
) {
  const { query, push } = useRouter();
  const [initActor, setInitActor] = useState<null | IActor>(null);

  const actorId = String(query.id);

  const { isLoading } = useQuery(
    [`get actor`, actorId],
    () => ActorService.getById(actorId),
    {
      onError: (error) => {
        toastError(error, `Get actor`);
      },

      onSuccess: ({ data }) => {
        setInitActor(data);

        setValue(`name`, data.name);
        setValue(`slug`, data.slug);
        setValue(`photo`, data.photo);
      },
      enabled: !!query.id,
    },
  );

  const { mutateAsync: update } = useMutation(
    `update actor`,
    (data: IActorUpdate) => ActorService.updateOne(actorId, data),
    {
      onError: (error) => {
        toastError(error, `Update actor`);
      },

      onSuccess: () => {
        toastr.success(`Update actor`, `update was successful`);
        push(PAGES_URL.admin(`actors`));
      },
    },
  );

  const { mutateAsync: upload } = useMutation(
    `upload file`,
    (data: FormData) => FileService.upload(data, typeFile),
    {
      onError: (error) => {
        toastError(error, `Upload file`);
      },
    },
  );

  const onSubmit: SubmitHandler<IActorEditForm> = async (data) => {
    if (!initActor) return;

    const payload: IActorUpdate = {};

    if (data.name !== initActor.name) payload.name = data.name;

    if (data.slug !== initActor.slug) payload.slug = data.slug;

    if (
      (data.photo as File).name !== initActor.name &&
      !isArrayString(data.photo)
    ) {
      const formData = new FormData();
      formData.append(`files`, data.photo as File);
      const {
        data: [fileId],
      } = await upload(formData);

      payload.photo = [fileId];
    }

    if (!getObjKeysLength(payload)) {
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
