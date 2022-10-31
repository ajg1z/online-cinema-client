import { useQuery } from 'react-query';

import { pages } from '@/config/url.config';

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
          link: pages.genre(genre.slug),
        }));
      },
    },
  );

  return queryData;
};
