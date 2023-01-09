import { FC, useState } from 'react';

import { PAGES_URL } from '@/config/url.config';

import Meta from '@/utils/meta/Meta';

import GalleryItem from '../gallery/GalleryItem';
import Description from '../heading/Description';
import Heading from '../heading/Heading';

import styles from './Catalog.module.scss';
import { ICatalogProps } from './catalog.types';
import SortMovies from './sort-movies/SortMovies';

const Catalog: FC<ICatalogProps> = ({ description, title, movies }) => {
  const [localMovies, setLocalMovies] = useState(movies);

  const handleSearch = (value: string) => {
    if (value) {
      const regExp = new RegExp(value, 'ig');
      setLocalMovies(
        movies.filter(
          (movie) => movie.title.match(regExp) || movie.slug.match(regExp),
        ),
      );
    } else {
      setLocalMovies(movies);
    }
  };

  return (
    <Meta title={title} description={description}>
      <Heading className={styles.heading}>{title}</Heading>

      {description && (
        <Description text={description} className={styles.description} />
      )}

      <SortMovies
        handleSearch={handleSearch}
        movies={movies}
        setMovies={setLocalMovies}
      />

      <section className={styles.movies}>
        {localMovies.length ? (
          localMovies.map((m) => (
            <GalleryItem
              key={m._id}
              item={{
                link: PAGES_URL.movie(m.slug),
                name: m.title,
                posterPath: m.bigPoster,
                content: {
                  title: m.title,
                },
              }}
              variant='horizontal'
            />
          ))
        ) : (
          <div>Not found movies 😥</div>
        )}
      </section>
    </Meta>
  );
};

export default Catalog;
