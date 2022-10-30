import Logo from './Logo';
import styles from './Navigation.module.scss';
import MenuContainer from './menu-container/MenuContainer';

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <Logo />
      <MenuContainer />
    </div>
  );
};

export default Navigation;
