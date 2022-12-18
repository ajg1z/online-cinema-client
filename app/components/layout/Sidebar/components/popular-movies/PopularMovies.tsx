import React from 'react';
import { useQuery } from 'react-query';

import movieService from '@/services/movie.service';

import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import MovieList from '../movie-list/MovieList';

const PopularMovies = () => {
  const { isLoading, data } = useQuery(
    'popular movies in sidebar',
    movieService.getPopular,
  );

  if (isLoading)
    return (
      <div className='mt-11'>
        <SkeletonLoader count={3} className='h-24 mb-4' />
      </div>
    );

  return (
    <MovieList link='/trending' title='Popular movies' movies={data ?? []} />
  );
};

export default PopularMovies;
