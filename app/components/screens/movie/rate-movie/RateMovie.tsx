import { FC } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { selectUser } from '@/store/user/selectors';

import MaterialIcon from '@/components/ui/material-icon/MaterialIcon';
import AuthButton from '@/components/ui/video-player/auth-placeholder/AuthButton';

import styles from './RateMovie.module.scss';
import { useRateMovie } from './useRateMovie';

interface IRateMovieProps {
  id: string;
  slug: string;
}

const RateMovie: FC<IRateMovieProps> = ({ id, slug }) => {
  const user = useTypedSelector(selectUser);
  const { handleClick, rated, rating } = useRateMovie(id, !!user);
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>How do you like the movie ?</div>
      <div className={styles.subTitle}>Ratings improve recommendations</div>
      <ul className={styles.ratings}>
        {user ? (
          <>
            {rated ? (
              <div className={styles.feedback}>Thanks for your feedback!</div>
            ) : (
              <StarRatingComponent
                name='star-rating'
                value={rating}
                onStarClick={handleClick}
                emptyStarColor='#4f4f4f'
                renderStarIcon={() => <MaterialIcon name='MdStarRate' />}
              />
            )}
          </>
        ) : (
          <AuthButton slug={slug} />
        )}
      </ul>
    </div>
  );
};

export default RateMovie;
