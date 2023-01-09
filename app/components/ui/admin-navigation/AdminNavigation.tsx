import { memo } from 'react';

import AdminNavItem from './AdminNavItem';
import styles from './AdminNavigation.module.scss';
import { AdminNavItems } from './admin-navigation.constans';

const AdminNavigation = () => {
  const renderedNavItems = AdminNavItems.map((item) => {
    return <AdminNavItem item={item} key={item.link} />;
  });

  return (
    <nav className={styles.nav}>
      <ul>{renderedNavItems}</ul>
    </nav>
  );
};

export default memo(AdminNavigation);
