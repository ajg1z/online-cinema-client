import { useEffect } from 'react';
import { useMutation } from 'react-query';

import { MovieService } from './../services/movie/movie.service';

export const useUpdateCountOpened = (slug: string) => {
  const { mutateAsync } = useMutation(
    `update count opened movie`,
    (slug: string) => MovieService.updateOpenedCount(slug),
  );

  useEffect(() => {
    mutateAsync(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
