import Logo from './Logo';
import MenuContainer from './Menu/MenuContainer';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <Logo />
      <MenuContainer />
    </div>
  );
};

export default Navigation;
