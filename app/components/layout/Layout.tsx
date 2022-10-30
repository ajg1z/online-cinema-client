import { FC } from 'react';

import styles from './Layout.module.scss';
import { ILayoutProps } from './layout.types';
import Navigation from './navigation/Navigation';
import Sidebar from './sidebar/Sidebar';

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>{children}</main>
      <Sidebar />
    </div>
  );
};

export default Layout;
