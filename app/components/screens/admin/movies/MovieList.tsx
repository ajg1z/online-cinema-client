import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import Meta from '@/utils/meta/Meta';

import useDebounce from '@/hooks/useDebounce';

import AdminHeader from '@/components/ui/admin-header/AdminHeader';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminTable from '@/components/ui/admin-table/AdminTable';
import AdminAction from '@/components/ui/admin-table/admin-action/AdminAction';
import { IAdminTableColumn } from '@/components/ui/admin-table/admin-table.types';
import Heading from '@/components/ui/heading/Heading';

import CreateMovie from './CreateMovie';
import useMovies from './useMovies';

const MovieList = () => {
  const { data = [], isLoading, deleteMovie, createMovie } = useMovies();

  const [searchTerm, setSearchTerm] = useState(``);
  const [createMovieModal, setCreateMovieModal] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onCloseMovieModal = () => {
    setCreateMovieModal(false);
  };

  const openCreateMovieModal = () => {
    setCreateMovieModal(true);
  };

  const debouncedSearch = useDebounce(searchTerm, 500);

  const columns: IAdminTableColumn[] = useMemo(
    () => [
      { title: `Name`, key: `name`, sort: true },
      { title: `Genres`, key: `genres` },
      { title: `rating`, key: `rating`, sort: true },
      {
        title: `Action`,
        key: `action`,
        formatter: function (value: any) {
          return <AdminAction {...value} />;
        },
        titleAlign: 'right',
      },
    ],
    [],
  );

  const rows = useMemo(() => {
    return data.map((el) => ({
      ...el,
      action: {
        ...el.action,
        removeHandler: deleteMovie,
      },
    }));
  }, [data, deleteMovie]);

  const filterMovies = useCallback(
    (el: any) => {
      const regExp = new RegExp(`${debouncedSearch}`, 'ig');
      return !!(
        String(el.rating).match(regExp) ||
        el.name.match(regExp) ||
        el.genres.match(regExp)
      );
    },
    [debouncedSearch],
  );

  return (
    <Meta title='Movies'>
      <AdminNavigation />
      <Heading>Movies</Heading>

      <CreateMovie
        createMovie={createMovie}
        isLoading={isLoading}
        isOpen={createMovieModal}
        onClose={onCloseMovieModal}
      />

      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={openCreateMovieModal}
      />

      <AdminTable
        isLoading={isLoading}
        columns={columns}
        rows={rows}
        isSortRows
        filter={filterMovies}
        searchValue={debouncedSearch}
      />
    </Meta>
  );
};

export default MovieList;
