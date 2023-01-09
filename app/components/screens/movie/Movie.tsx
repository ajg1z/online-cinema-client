import dynamic from 'next/dynamic';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import Meta from '@/utils/meta/Meta';

import { useUpdateCountOpened } from '@/hooks/useUpdateCountOpened';

import Banner from '@/components/ui/banner/Banner';
import { Gallery } from '@/components/ui/gallery/Gallery';
import SubHeading from '@/components/ui/heading/SubHeading';

import { IMoviePageProps } from '../../../../pages/movie/[slug]';

import Content from './content/Content';

const DynamicRatingComponent = dynamic(() => import('./rate-movie/RateMovie'), {
  ssr: false,
});

const DynamicVideoPlayer = dynamic(
  () => import('@/ui/video-player/VideoPlayer'),
  { ssr: false },
);

const Movie: FC<IMoviePageProps> = ({ movie, similarMovies }) => {
  useUpdateCountOpened(movie.slug);

  return (
    <Meta title={movie.title} description={movie.description}>
      <Banner
        alt={movie.title}
        image={movie.bigPoster}
        Detail={() => <Content movie={movie} />}
      />

      <DynamicVideoPlayer
        poster={movie.poster}
        slug={movie.slug}
        videoSrc={movie.video}
      />

      <div className='mt-12'>
        <SubHeading>Similar</SubHeading>
        <Gallery items={similarMovies} />
      </div>

      <DynamicRatingComponent id={movie._id} slug={movie.slug} />
    </Meta>
  );
};

export default Movie;
