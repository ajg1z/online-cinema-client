import { FC } from 'react';

import { PAGES_URL } from '@/config/url.config';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { selectUser } from '@/store/user/selectors';

import { useFavorites } from '@/components/screens/favorites/useFavorites';
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import MovieList from '../movie-list/MovieList';

import NotAuthFavorite from './NotAuthFavorite';

const FavoriteMovies: FC = () => {
  const user = useTypedSelector(selectUser);
  const { favoriteMovies, isLoading } = useFavorites();

  if (!user) return <NotAuthFavorite />;

  return isLoading ? (
    <div className='mt-11'>
      <SkeletonLoader count={3} className='h-28 mb-4' />
    </div>
  ) : (
    <>
      <MovieList
        title='Favorites'
        link={PAGES_URL.favorites()}
        movies={favoriteMovies?.slice(0, 3) ?? []}
        textInNotMovies='You not favorites movies'
      />
    </>
  );
};

export default FavoriteMovies;
