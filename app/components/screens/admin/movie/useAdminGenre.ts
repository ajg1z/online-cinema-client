import { useQuery } from 'react-query';

import { toastError } from '@/utils/toast-error';

import { GenreService } from '@/services/genre/genre.service';

export function useAdminGenre() {
  const queryData = useQuery(`List of genre`, () => GenreService.getAll(), {
    onError: (error) => {
      toastError(error, `admin genre list`);
    },
    select: ({ data }) =>
      data.map((option) => ({
        label: option.name,
        value: option._id,
      })),
  });

  return queryData;
}
