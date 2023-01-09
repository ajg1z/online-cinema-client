import { GetStaticProps, NextPage } from 'next';

import { IMovie } from '@/shared/types/movie.types';

import MovieService from '@/services/movie/movie.service';

import Catalog from '@/components/ui/catalog-movies/Catalog';

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
  return (
    <Catalog
      title='Trending movies'
      description='Trending movies in excellent quality: legal, safe, without ads'
      movies={movies ?? []}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const movies = await MovieService.getPopular();

    return {
      props: {
        movies,
      },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default TrendingPage;
