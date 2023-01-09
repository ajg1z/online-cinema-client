import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { toastError } from '@/utils/toast-error';

import RatingService from '@/services/rating/rating.service';

export const useRateMovie = (movieId: string, isAuth: boolean) => {
  const [rating, setRating] = useState<number>(0);
  const [rated, setRated] = useState(false);

  useQuery(
    [`get rating`, movieId],
    () => RatingService.getByUserMovie(movieId),
    {
      onError: (error) => {
        toastError(error, `Get rating`);
      },
      onSuccess({ data }) {
        setRating(data);
      },
      enabled: isAuth,
    },
  );

  const { mutateAsync: updateRating } = useMutation(
    `set rating`,
    (rating: number) => RatingService.setRating(movieId, rating),
    {
      onError: (error) => {
        toastError(error, `Set rating`);
      },
      onSuccess({ data }) {
        toastr.success(`Rate movie`, `You have successfully rated!`);
        setRating(data);
        setRated(true);

        setTimeout(() => {
          setRated(false);
        }, 2500);
      },
    },
  );

  const handleClick = async (nextValue: number) => {
    setRating(nextValue);
    updateRating(+nextValue);
  };

  return {
    rated,
    handleClick,
    rating,
  };
};
