import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_STORAGE } from '@/config/constans';

import { getStoreLocal } from '@/utils/local-storage';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';
import { FCC } from '@/shared/types/react.types';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { selectUser } from '@/store/user/selectors';

const DynamicCheckRole = dynamic(() => import(`./CheckRole`), { ssr: false });

const AuthProvider: FCC<TypeComponentAuthFields> = ({
  Component: { isOnlyAdmin, isOnlyUser },
  children,
}) => {
  const user = useTypedSelector(selectUser);

  const { logout, checkAuth } = useActions();

  const { pathname } = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get(ACCESS_TOKEN);
    if (accessToken) checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    if (!refreshToken && user) logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!isOnlyUser && !isOnlyAdmin) return <>{children}</>;

  return (
    <DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
      {children}
    </DynamicCheckRole>
  );
};

export default AuthProvider;
