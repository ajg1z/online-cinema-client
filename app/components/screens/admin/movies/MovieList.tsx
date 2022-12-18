import React from 'react';

import Meta from '@/utils/meta/Meta';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/admin-header/AdminHeader';
import AdminTable from '@/components/ui/admin-table/table/AdminTable';
import Heading from '@/components/ui/heading/Heading';

import useMovies from './useMovies';

const MovieList = () => {
  const {
    data = [],
    isLoading,
    searchTerm,
    handleSearch,
    deleteMovie,
  } = useMovies();

  const addMovie = () => {};

  const columns = React.useMemo(
    () => [
      { Header: `Name`, accessor: `name` },
      { Header: `Genres`, accessor: `genres` },
      { Header: `rating`, accessor: `rating` },
      { Header: `Action`, accessor: `action` },
    ],
    [],
  );

  return (
    <Meta title='Movies'>
      <AdminNavigation />
      <Heading>Movies</Heading>
      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={addMovie}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteMovie}
        columns={columns}
        data={data}
      />
    </Meta>
  );
};

export default MovieList;
