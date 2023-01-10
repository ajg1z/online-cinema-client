import { errorCatch } from 'api/api.helpers';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

import { IGenre, IMovie } from '@/shared/types/movie.types';

import GenreService from '@/services/genre/genre.service';
import MovieService from '@/services/movie/movie.service';

import Catalog from '@/components/ui/catalog-movies/Catalog';

import Error404 from '../404';

interface IGenrePageProps {
  movies: IMovie[];
  genre: IGenre | undefined;
}

const GenrePage: NextPage<IGenrePageProps> = ({ movies, genre }) => {
  if (!genre) return <Error404 />;

  return (
    <Catalog
      description={genre.description}
      title={genre.name}
      movies={movies ?? []}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: genres } = await GenreService.getAll();

    return {
      paths: genres.map((genre) => ({
        params: { slug: genre.slug },
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

export const getStaticProps: GetStaticProps<IGenrePageProps> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (!slug || Array.isArray(slug)) return { notFound: true };

  try {
    const { data: genre } = await GenreService.getBySlug(slug);

    if (!genre) return { notFound: true };

    const { data: movies } = await MovieService.getByGenres([genre._id]);

    return {
      props: {
        genre,
        movies,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.warn(errorCatch(e));

    return {
      notFound: true,
    };
  }
};

export default GenrePage;
