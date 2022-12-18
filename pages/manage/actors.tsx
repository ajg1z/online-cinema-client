import React from 'react';

import { NextPageAuth } from '@/shared/types/auth.types';

import ActorList from '@/components/screens/admin/actors/ActorList';

const ActorsPage: NextPageAuth = () => {
  return <ActorList />;
};

ActorsPage.isOnlyAdmin = true;

export default ActorsPage;
