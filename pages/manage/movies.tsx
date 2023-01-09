import { NextPageAuth } from '@/shared/types/auth.types';

import MovieList from '@/components/screens/admin/movies/MovieList';

const MoviesPage: NextPageAuth = () => {
  return <MovieList />;
};

MoviesPage.isOnlyAdmin = true;

export default MoviesPage;
