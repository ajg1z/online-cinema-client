import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import Meta from '@/utils/meta/Meta';

import useDebounce from '@/hooks/useDebounce';

import AdminHeader from '@/components/ui/admin-header/AdminHeader';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminTable from '@/components/ui/admin-table/AdminTable';
import AdminAction from '@/components/ui/admin-table/admin-action/AdminAction';
import { IAdminTableColumn } from '@/components/ui/admin-table/admin-table.types';
import Heading from '@/components/ui/heading/Heading';

import CreateGenre from './CreateGenre';
import useGenres from './useGenres';

const GenreList = () => {
  const { data = [], isLoading, deleteGenre, createGenre } = useGenres();

  const [searchTerm, setSearchTerm] = useState(``);
  const [createGenreModal, setCreateGenreModal] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onCloseGenreModal = () => {
    setCreateGenreModal(false);
  };

  const openCreateGenreModal = () => {
    setCreateGenreModal(true);
  };

  const debouncedSearch = useDebounce(searchTerm, 500);

  const columns: IAdminTableColumn[] = useMemo(
    () => [
      { title: `Name`, key: `name`, sort: true },
      { title: `Slug`, key: `slug`, sort: true },
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
        removeHandler: deleteGenre,
      },
    }));
  }, [data, deleteGenre]);

  const filterGenres = useCallback(
    (el: any) => {
      const regExp = new RegExp(`${debouncedSearch}`, 'ig');

      return !!(el.name.match(regExp) || el.slug.match(regExp));
    },
    [debouncedSearch],
  );

  return (
    <Meta title='Genres'>
      <AdminNavigation />
      <Heading>Genres</Heading>

      <CreateGenre
        createGenre={createGenre}
        isOpen={createGenreModal}
        onClose={onCloseGenreModal}
      />

      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={openCreateGenreModal}
      />

      <AdminTable
        isLoading={isLoading}
        columns={columns}
        rows={rows}
        isSortRows
        filter={filterGenres}
        searchValue={debouncedSearch}
      />
    </Meta>
  );
};

export default GenreList;
