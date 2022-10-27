import styles from './Navigation.module.scss';
import Logo from './components/Logo/Logo';
import Menu from './components/Menu/Menu';

const Navigation = () => {
  return (
    <div>
      <Logo />
      <Menu />
    </div>
  );
};

export default Navigation;
