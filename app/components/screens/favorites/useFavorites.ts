import { enUS } from 'date-fns/locale';
import { useQuery } from 'react-query';

import { UserService } from '@/services/user/user.service';

import { useTypedSelector } from './../../../hooks/useTypedSelector';
import { selectUser } from './../../../store/user/selectors';

export const useFavorites = () => {
  const user = useTypedSelector(selectUser);
  const { refetch, isLoading, data } = useQuery(
    `get favorites`,
    UserService.getFavorites,
    {
      select(data) {
        return data.data ?? [];
      },
      enabled: !!user,
    },
  );

  return {
    isLoading,
    favoriteMovies: data,
    refetch,
  };
};
