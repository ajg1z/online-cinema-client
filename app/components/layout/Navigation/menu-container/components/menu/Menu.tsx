import dynamic from 'next/dynamic';
import React, { FC } from 'react';

import { IMenuProps } from '../../menu.types';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const DynamicAuthItems = dynamic(() => import('../auth/AuthItems'), {
  ssr: false,
});

const Menu: FC<IMenuProps> = ({ menu }) => {
  return (
    <div className={styles.menu}>
      <p className={styles.title}>{menu.title}</p>
      <ul className={styles.menuList}>
        {menu.items.map((item) => {
          return (
            <MenuItem
              key={item.link}
              icon={item.icon}
              link={item.link}
              title={item.title}
            />
          );
        })}
        {menu.id === 2 ? <DynamicAuthItems /> : null}
      </ul>
    </div>
  );
};

export default Menu;
