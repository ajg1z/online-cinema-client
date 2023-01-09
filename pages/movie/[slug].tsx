import { errorCatch } from 'api/api.helpers';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

import { PAGES_URL } from '@/config/url.config';

import { IMovie } from '@/shared/types/movie.types';

import MovieService from '@/services/movie/movie.service';

import Movie from '@/components/screens/movie/Movie';
import { IGalleryItem } from '@/components/ui/gallery/gallery.types';

import Error404 from '../404';

export interface IMoviePageProps {
  movie: IMovie;
  similarMovies: IGalleryItem[];
}

const MoviePage: NextPage<IMoviePageProps> = ({ movie, similarMovies }) => {
  if (!movie) return <Error404 />;

  return <Movie movie={movie} similarMovies={similarMovies} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: movies } = await MovieService.getAll();

    return {
      paths: movies.map((movie) => ({
        params: { slug: movie.slug },
      })),
      fallback: `blocking`,
    };
  } catch (e) {
    return {
      paths: [],
      fallback: `blocking`,
    };
  }
};

export const getStaticProps: GetStaticProps<IMoviePageProps> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (!slug || Array.isArray(slug)) return { notFound: true };

  try {
    const { data: movie } = await MovieService.getBySlug(slug);

    if (!movie) return { notFound: true };

    const { data: similarMovies } = await MovieService.getByGenres(
      movie.genres.map((genre) => genre._id),
    );

    const moviesGallery: IGalleryItem[] = similarMovies
      .filter((movie) => movie.slug !== slug)
      .map((movie) => ({
        link: PAGES_URL.movie(movie.slug),
        name: movie.title,
        posterPath: movie.poster,
      }));

    return {
      props: {
        similarMovies: moviesGallery,
        movie,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log(errorCatch(e));

    return {
      notFound: true,
    };
  }
};

export default MoviePage;
