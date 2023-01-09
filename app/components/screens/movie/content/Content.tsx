import { FC } from 'react';

import { PAGES_URL } from '@/config/url.config';

import { IMovie } from '@/shared/types/movie.types';

import MaterialIcon from '@/components/ui/material-icon/MaterialIcon';

import FavoriteButton from '../../favorites/favorite-button/FavoriteButton';

import styles from './Content.module.scss';
import ContentList from './content-list/ContentList';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectUser } from '@/store/user/selectors';

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
  const user=useTypedSelector(selectUser);

  return (
    <div className={styles.content}>
      <h1>{movie.title}</h1>

      <div className={styles.details}>
        <span>{movie.parameters.year} / </span>
        <span>{movie.parameters.country} / </span>
        <span>{movie.parameters.duration}</span>
      </div>

      <ContentList
        name='Genres'
        links={movie.genres.slice(0, 3).map((genre) => ({
          _id: genre._id,
          link: PAGES_URL.genre(genre.slug),
          title: genre.name,
        }))}
      />

      <ContentList
        name='Actors'
        links={movie.actors.slice(0, 3).map((actor) => ({
          _id: actor._id,
          link: PAGES_URL.actor(actor.slug),
          title: actor.name,
        }))}
      />

      <div className={styles.rating}>
        <MaterialIcon name='MdStarRate' />
        <span>{movie.rating.toFixed(1)}</span>
      </div>

      {user &&  <FavoriteButton movieId={movie._id} />}
    </div>
  );
};

export default Content;
