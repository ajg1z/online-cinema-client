import styles from './Sidebar.module.scss';
import FavoriteMovies from './components/favorite-movies/FavoriteMovies';
import PopularMovies from './components/popular-movies/PopularMovies';
import Search from './components/search/Search';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
      <PopularMovies />
      <FavoriteMovies />
    </div>
  );
};

export default Sidebar;
