import { FC } from 'react';

import { ILayoutProps } from './Layout.interface';
import styles from './Layout.module.scss';
import Navigation from './Navigation/Navigation';
import Sidebar from './Sidebar/Sidebar';

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
