import React from 'react';
import { useQuery } from 'react-query';

import MovieService from '@/services/movie/movie.service';

import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import MovieList from '../movie-list/MovieList';

const PopularMovies = () => {
  const { isLoading, data } = useQuery(
    'popular movies in sidebar',
    MovieService.getPopular,
    {
      select(data) {
        return data.length ? data.slice(0, 5) : [];
      },
    },
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
