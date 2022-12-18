import { useRouter } from 'next/router';
import React from 'react';

import { PAGES_URL } from '@/config/url.config';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';
import { FCC } from '@/shared/types/react.types';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { selectUser } from '@/store/user/selectors';

const CheckRole: FCC<TypeComponentAuthFields> = ({
  Component: { isOnlyAdmin, isOnlyUser },
  children,
}) => {
  const user = useTypedSelector(selectUser);

  const router = useRouter();

  const Children = () => <>{children}</>;

  if (user?.isAdmin) return <Children />;

  if (isOnlyAdmin) {
    router.pathname !== PAGES_URL[404]() && router.replace(PAGES_URL[404]());
    return null;
  }

  const isUser = user && !user.isAdmin;

  if (isOnlyUser && isUser) return <Children />;

  router.pathname !== PAGES_URL.auth() && router.replace(PAGES_URL.auth());
  return null;
};

export default CheckRole;
