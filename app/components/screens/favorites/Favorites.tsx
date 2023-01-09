import { FC } from 'react';

import { PAGES_URL } from '@/config/url.config';

import Meta from '@/utils/meta/Meta';

import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import styles from './Favorites.module.scss';
import FavoriteItem from './favorite-item/FavoriteItem';
import { useFavorites } from './useFavorites';

const Favorites: FC = () => {
  const { favoriteMovies, isLoading } = useFavorites();

  return (
    <Meta title='Favorites'>
      <Heading>Favorites</Heading>
      <section className={styles.favorites}>
        {isLoading ? (
          <SkeletonLoader
            count={3}
            className={styles.skeletonLoader}
            containerClassName={styles.containerLoader}
          />
        ) : (
          <>
            {favoriteMovies?.length ? (
              favoriteMovies?.map((movie) => (
                <FavoriteItem
                  key={movie._id}
                  item={{
                    name: movie.title,
                    posterPath: movie.bigPoster,
                    title: movie.title,
                    _id: movie._id,
                    link: PAGES_URL.movie(movie.slug),
                  }}
                />
              ))
            ) : (
              <div>You not have any favorites</div>
            )}
          </>
        )}
      </section>
    </Meta>
  );
};

export default Favorites;
