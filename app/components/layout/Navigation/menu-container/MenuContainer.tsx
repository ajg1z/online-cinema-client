import { FC } from 'react';

import GenreMenu from './components/genres/GenreMenu';
import Menu from './components/menu/Menu';
import { firstMenu, userMenu } from './constans';

const MenuContainer: FC = () => {
  return (
    <>
      <Menu menu={firstMenu} />
      <GenreMenu />
      <Menu menu={userMenu} />
    </>
  );
};

export default MenuContainer;
