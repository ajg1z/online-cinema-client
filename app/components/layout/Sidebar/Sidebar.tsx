import dynamic from 'next/dynamic';

import styles from './Sidebar.module.scss';
import PopularMovies from './components/popular-movies/PopularMovies';
import Search from './components/search/Search';

const DynamicFavoriteMovies = dynamic(
  () => import('./components/favorite-movies/FavoriteMovies'),
  { ssr: false },
);

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
      <PopularMovies />
      <DynamicFavoriteMovies />
    </div>
  );
};

export default Sidebar;
