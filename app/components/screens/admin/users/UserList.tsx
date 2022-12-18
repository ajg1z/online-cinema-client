import { useEffect, useMemo, useState } from 'react';

import Meta from '@/utils/meta/Meta';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/admin-header/AdminHeader';
import AdminTable from '@/components/ui/admin-table/table/AdminTable';
import Heading from '@/components/ui/heading/Heading';

import useUsers from './useUsers';

const UserList = () => {
  const [searchValue, setSearchValue] = useState(``);

  const {
    data = [],
    isLoading,
    searchTerm,
    handleSearch,
    deleteUser,
  } = useUsers();

  const addUser = () => {};

  const columns = useMemo(
    () => [
      { Header: `Email`, accessor: `email`, Footer: `email` },
      { Header: `Date register`, accessor: `dateRegister` },
      { Header: `Action`, accessor: `action` },
    ],
    [],
  );

  return (
    <Meta title='Users'>
      <AdminNavigation />
      <Heading>Users</Heading>
      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={addUser}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteUser}
        columns={columns}
        data={data}
      />
    </Meta>
  );
};

export default UserList;
