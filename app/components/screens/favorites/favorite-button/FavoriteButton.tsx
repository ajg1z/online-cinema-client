import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { toastError } from '@/utils/toast-error';

import { UserService } from '@/services/user/user.service';

import { useFavorites } from '../useFavorites';

import styles from './FavoriteButton.module.scss';
import HeartImage from './heart-animation.png';

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
  const [isSmashed, setIsSmashed] = useState(false);
  const { favoriteMovies, refetch } = useFavorites();

  useEffect(() => {
    if (!favoriteMovies) return;

    const isHasMovie = favoriteMovies.some((m) => m._id === movieId);
    if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie);
  }, [favoriteMovies, isSmashed, movieId]);

  const { mutateAsync } = useMutation(
    `toggle favorite movie`,
    (movieId: string) => UserService.toggleFavorite(movieId),
    {
      onError(error) {
        toastError(error, `update favorites list`);
      },
      onSuccess() {
        setIsSmashed(!isSmashed);
        refetch();
      },
    },
  );

  return (
    <button
      className={cn(styles.button, { [styles.animate]: isSmashed })}
      style={{ backgroundImage: `url(${HeartImage.src})` }}
      onClick={() => mutateAsync(movieId)}
    />
  );
};

export default FavoriteButton;
