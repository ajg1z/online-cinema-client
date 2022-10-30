import React from 'react';

import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import Menu from '../menu/Menu';

import { usePopularGenres } from './usePopularGenres';

const GenreMenu = () => {
  const { isLoading, data } = usePopularGenres();

  if (isLoading)
    return (
      <div className='mx-11 mb-6'>
        <SkeletonLoader count={5} className='h-7 mt-6' />
      </div>
    );

  return <Menu menu={{ title: 'Popular genres', id: 3, items: data || [] }} />;
};

export default GenreMenu;
