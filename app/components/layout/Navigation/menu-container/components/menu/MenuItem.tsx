import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import MaterialIcon from '@/components/ui/material-icon/MaterialIcon';

import { IMenuItem } from '../../menu.types';

import styles from './Menu.module.scss';

const MenuItem: FC<IMenuItem> = ({ icon, link, title }) => {
  const { asPath } = useRouter();
  return (
    <li
      className={cn({
        [styles.activeLink]: asPath === link,
      })}
    >
      <Link className={styles.link} href={link}>
        <MaterialIcon name={icon} />
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
