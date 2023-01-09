import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

import { PAGES_URL } from '@/config/url.config';

import NotFoundImg from '@/assets/images/notFoundImg.jpg';

import MovieService from '@/services/movie/movie.service';

import SubHeading from '@/components/ui/heading/SubHeading';
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import styles from '../Admin.module.scss';

const PopularMovie = () => {
  const { isLoading, data } = useQuery(
    `most popular movie`,
    MovieService.getPopular,
    {
      select: (data) => data[0],
    },
  );

  const mostPopularMovie = data && (
    <>
      <h3>Opened {data.countOpened}</h3>
      <Link href={PAGES_URL.movie(data.slug)}>
        <Image
          width={285}
          height={176}
          className={styles.image}
          unoptimized
          alt={data.slug}
          src={data.bigPoster || NotFoundImg}
        />
      </Link>
    </>
  );

  return (
    <div className={classNames(styles.block, styles.popular)}>
      <SubHeading>The most popular movie</SubHeading>
      {isLoading ? <SkeletonLoader className='h-48' /> : mostPopularMovie}
    </div>
  );
};

export default PopularMovie;
