import React from 'react';

import Meta from '@/utils/meta/Meta';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/admin-header/AdminHeader';
import AdminTable from '@/components/ui/admin-table/table/AdminTable';
import Heading from '@/components/ui/heading/Heading';

import useActors from './useActors';

const ActorList = () => {
  const {
    data = [],
    isLoading,
    searchTerm,
    handleSearch,
    deleteActor,
  } = useActors();

  const addActor = () => {};

  const columns = React.useMemo(
    () => [
      { Header: `Name`, accessor: `name` },
      { Header: `Count Movies`, accessor: `countMovies` },
      { Header: `Action`, accessor: `action` },
    ],
    [],
  );

  return (
    <Meta title='Actors'>
      <AdminNavigation />
      <Heading>Actors</Heading>
      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={addActor}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteActor}
        columns={columns}
        data={data}
      />
    </Meta>
  );
};

export default ActorList;
