import React, { FC } from 'react';

import { IMenuProps } from '../../menu.types';
import AuthItems from '../auth/AuthItems';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

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
        {menu.id === 2 ? <AuthItems /> : null}
      </ul>
    </div>
  );
};

export default Menu;
