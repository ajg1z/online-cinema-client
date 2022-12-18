import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { selectUser } from '@/store/user/selectors';

export const useAuthRedirect = () => {
  const { push, query } = useRouter();

  const user = useTypedSelector(selectUser);

  const redirect = query.redirect || '/';

  useEffect(() => {
    if (user) push(String(redirect));
  }, [user, redirect, push]);
};
