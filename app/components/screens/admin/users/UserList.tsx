import { parse } from 'date-fns';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import Meta from '@/utils/meta/Meta';

import useDebounce from '@/hooks/useDebounce';

import AdminHeader from '@/components/ui/admin-header/AdminHeader';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminTable from '@/components/ui/admin-table/AdminTable';
import AdminAction from '@/components/ui/admin-table/admin-action/AdminAction';
import { IAdminTableColumn } from '@/components/ui/admin-table/admin-table.types';
import Heading from '@/components/ui/heading/Heading';

import useUsers from './useUsers';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState(``);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data = [], deleteUser, isLoading } = useUsers();

  const columns: IAdminTableColumn[] = useMemo(
    () =>
      [
        {
          title: `Email`,
          key: `email`,
          sort: true,
        },
        {
          title: `Date register`,
          key: `dateRegister`,
          sort: true,
          sortFunction: (rows, dir) => {
            return rows.sort((a, b) => {
              const aDate: number = parse(
                a.dateRegister,
                'dd.mm.yyyy',
                new Date(),
              ).getTime();

              const bDate = parse(
                b.dateRegister,
                'dd.mm.yyyy',
                new Date(),
              ).getTime();

              return dir === 'asc' ? aDate - bDate : bDate - aDate;
            });
          },
        },
        {
          title: 'isAdmin',
          key: 'isAdmin',
          sort: true,
          align: 'center',
          titleAlign: 'center',
        },
        {
          title: `Action`,
          key: `action`,
          formatter: function (value: any) {
            return <AdminAction {...value} />;
          },
          titleAlign: 'right',
        },
      ] as IAdminTableColumn[],
    [],
  );

  const rows = useMemo(() => {
    return data.map((el) => ({
      ...el,
      action: {
        ...el.action,
        removeHandler: deleteUser,
      },
    }));
  }, [data, deleteUser]);

  const filterUser = useCallback(
    (el: any) => {
      const regExp = new RegExp(`${debouncedSearch}`, 'ig');

      return !!(el.email.match(regExp) || el.dateRegister.match(regExp));
    },
    [debouncedSearch],
  );

  return (
    <Meta title='Users'>
      <AdminNavigation />
      <Heading>Users</Heading>
      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />

      <AdminTable
        searchValue={debouncedSearch}
        filter={filterUser}
        columns={columns}
        rows={rows}
        isSortRows
        isLoading={isLoading}
      />
    </Meta>
  );
};

export default UserList;
