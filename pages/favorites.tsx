import { NextPageAuth } from '@/shared/types/auth.types';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { selectUser } from '@/store/user/selectors';

import Favorites from '@/components/screens/favorites/Favorites';

import Error404 from './404';

const FavoritesPage: NextPageAuth = () => {
  const user = useTypedSelector(selectUser);
  if (!user) return <Error404 />;
  return <Favorites />;
};

FavoritesPage.isOnlyUser;

export default FavoritesPage;
