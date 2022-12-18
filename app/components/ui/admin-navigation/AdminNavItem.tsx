import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import styles from './AdminNavigation.module.scss';
import { IAdminNavItem } from './admin-navigation.types';

const AdminNavItem: FC<{ item: IAdminNavItem }> = ({ item }) => {
  const { asPath } = useRouter();

  return (
    <li>
      <Link
        href={item.link}
        className={cn({ [styles.active]: asPath === item.link })}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default AdminNavItem;
