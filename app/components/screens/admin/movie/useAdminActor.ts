import { useQuery } from 'react-query';

import { toastError } from '@/utils/toast-error';

import { ActorService } from '@/services/actor-service/actor.service';

export function useAdminActor() {
  const queryData = useQuery(`List of Actor`, () => ActorService.getAll(), {
    onError: (error) => {
      toastError(error, `admin Actor list`);
    },
    select: ({ data }) =>
      data.map((option) => ({
        label: option.name,
        value: option._id,
      })),
  });

  return queryData;
}
