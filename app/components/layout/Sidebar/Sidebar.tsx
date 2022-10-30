import styles from './Sidebar.module.scss';
import Search from './components/search/Search';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
    </div>
  );
};

export default Sidebar;
