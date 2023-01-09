import { useQuery } from 'react-query';

import { PAGES_URL } from '@/config/url.config';

import { GenreService } from '../../../../../../services/genre/genre.service';

export const usePopularGenres = () => {
  const queryData = useQuery(
    'popular genre menu',
    () => GenreService.getPopular(),
    {
      select: ({ data }) => {
        return data
          .filter((genre) => genre.icon)
          .map((genre) => ({
            title: genre.name,
            icon: genre.icon,
            link: PAGES_URL.genre(genre.slug),
          }));
      },
    },
  );

  return queryData;
};
