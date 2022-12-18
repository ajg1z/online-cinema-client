import React from 'react';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { selectUser } from '@/store/user/selectors';

import { PAGES_URL } from '../../../../../../config/url.config';
import MenuItem from '../menu/MenuItem';

import LogoutButton from './LogoutButton';

const AuthItems = () => {
  const user = useTypedSelector(selectUser);

  return (
    <>
      {user ? (
        <>
          <MenuItem icon='MdSettings' link='/profile' title='Profile' />
          <LogoutButton />
        </>
      ) : (
        <MenuItem link={PAGES_URL.auth()} title='Login' icon='MdLogin' />
      )}

      {user?.isAdmin && (
        <MenuItem
          link={PAGES_URL.admin()}
          icon='MdOutlineLock'
          title='Admin panel'
        />
      )}
    </>
  );
};

export default AuthItems;
