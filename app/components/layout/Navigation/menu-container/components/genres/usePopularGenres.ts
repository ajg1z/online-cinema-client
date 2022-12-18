import { useQuery } from 'react-query';

import { PAGES_URL } from '@/config/url.config';

import { genreService } from './../../../../../../services/genre.service';

export const usePopularGenres = () => {
  const queryData = useQuery(
    'popular genre menu',
    () => genreService.getPopular(),
    {
      select: ({ data }) => {
        return data.map((genre) => ({
          title: genre.name,
          icon: genre.icon,
          link: PAGES_URL.genre(genre.slug),
        }));
      },
    },
  );

  return queryData;
};
