import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import Meta from '@/utils/meta/Meta';

import useDebounce from '@/hooks/useDebounce';

import AdminHeader from '@/components/ui/admin-header/AdminHeader';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminTable from '@/components/ui/admin-table/AdminTable';
import AdminAction from '@/components/ui/admin-table/admin-action/AdminAction';
import { IAdminTableColumn } from '@/components/ui/admin-table/admin-table.types';
import Heading from '@/components/ui/heading/Heading';

import CreateActor from './CreateActor';
import useActors from './useActors';

const ActorList = () => {
  const { data = [], isLoading, deleteActor, createActor } = useActors();
  const [createActorModal, setCreateActorModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState(``);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearch = useDebounce(searchTerm, 500);

  const columns: IAdminTableColumn[] = useMemo(
    () => [
      { title: `Name`, key: `name`, sort: true },
      { title: `Count Movies`, key: `countMovies`, sort: true },
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
        removeHandler: deleteActor,
      },
    }));
  }, [data, deleteActor]);

  const filterActors = useCallback(
    (el: any) => {
      const regExp = new RegExp(`${debouncedSearch}`, 'ig');
      return !!(String(el.countMovies).match(regExp) || el.name.match(regExp));
    },
    [debouncedSearch],
  );

  const onCloseGenreModal = () => {
    setCreateActorModal(false);
  };

  const openCreateGenreModal = () => {
    setCreateActorModal(true);
  };

  return (
    <Meta title='Actors'>
      <AdminNavigation />
      <Heading>Actors</Heading>

      <CreateActor
        isLoading={isLoading}
        createActor={createActor}
        isOpen={createActorModal}
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
        filter={filterActors}
        isSortRows
        searchValue={debouncedSearch}
      />
    </Meta>
  );
};

export default ActorList;
