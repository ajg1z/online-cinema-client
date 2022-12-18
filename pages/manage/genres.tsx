import React from 'react';

import { NextPageAuth } from '@/shared/types/auth.types';

import GenreList from '@/components/screens/admin/genres/GenreList';

const GenresPage: NextPageAuth = () => {
  return <GenreList />;
};

GenresPage.isOnlyAdmin = true;

export default GenresPage;
