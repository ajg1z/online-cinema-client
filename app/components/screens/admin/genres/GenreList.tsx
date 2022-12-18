import React from 'react';

import Meta from '@/utils/meta/Meta';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/admin-header/AdminHeader';
import AdminTable from '@/components/ui/admin-table/table/AdminTable';
import Heading from '@/components/ui/heading/Heading';

import useGenres from './useGenres';

const GenreList = () => {
  const {
    data = [],
    isLoading,
    searchTerm,
    handleSearch,
    deleteGenre,
  } = useGenres();

  const addGenre = () => {};

  const columns = React.useMemo(
    () => [
      { Header: `Name`, accessor: `name` },
      { Header: `Slug`, accessor: `slug` },
      { Header: `Action`, accessor: `action` },
    ],
    [],
  );

  return (
    <Meta title='Genres'>
      <AdminNavigation />
      <Heading>Genres</Heading>
      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={addGenre}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteGenre}
        columns={columns}
        data={data}
      />
    </Meta>
  );
};

export default GenreList;
