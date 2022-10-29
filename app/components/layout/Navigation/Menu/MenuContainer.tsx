import { FC } from 'react';

import styles from './Menu.module.scss';
import Menu from './components/Menu/Menu';
import { firstMenu, userMenu } from './constans';

const MenuContainer: FC = () => {
  return (
    <div>
      <Menu menu={firstMenu} />
      {/* Genres menu */}
      <Menu menu={userMenu} />
    </div>
  );
};

export default MenuContainer;
