import { useQuery } from 'react-query';

import { pages } from '@/config/url.config';

import { genreService } from './../../../../../../services/genre.service';
import { IMenuItem } from './../../menu.types';

export const usePopularGenres = () => {
  const queryData = useQuery(
    'popular genre menu',
    () => genreService.getAll(),
    {
      select: ({ data }) => {
        return data
          .map((genre) => ({
            title: genre.name,
            icon: genre.icon,
            link: pages.genre(genre.slug),
          }))
          .slice(0, 4) as IMenuItem[];
      },
    },
  );

  return queryData;
};
