import { useQuery } from 'react-query';

import { genreService } from './../../../../../../services/genre.service';

export const usePopularGenres = () => {
  const queryData = useQuery('popular genre menu', () =>
    genreService.getPopularGenres(),
  );

  return queryData;
};
