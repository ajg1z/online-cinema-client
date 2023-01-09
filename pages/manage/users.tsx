import { NextPageAuth } from '@/shared/types/auth.types';

import UserList from '@/components/screens/admin/users/UserList';

const Users: NextPageAuth = () => {
  return <UserList />;
};

Users.isOnlyAdmin = true;

export default Users;
