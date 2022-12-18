import React from 'react';

import Meta from '@/utils/meta/Meta';

import Heading from '@/components/ui/heading/Heading';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';

import Statistics from './statistics/Statistics';

const Admin = () => {
  return (
    <Meta title='Admin panel'>
      <AdminNavigation />
      <Heading>Some Statistics</Heading>
      <Statistics />
    </Meta>
  );
};

export default Admin;
