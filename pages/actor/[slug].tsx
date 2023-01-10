import { errorCatch } from 'api/api.helpers';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

import { IActor, IMovie } from '@/shared/types/movie.types';

import { ActorService } from '@/services/actor-service/actor.service';
import MovieService from '@/services/movie/movie.service';

import Catalog from '@/components/ui/catalog-movies/Catalog';

import Error404 from '../404';

interface IActorPageProps {
  movies: IMovie[];
  actor: IActor | undefined;
}

const ActorPage: NextPage<IActorPageProps> = ({ movies, actor }) => {
  if (!actor) return <Error404 />;

  return <Catalog title={actor.name} movies={movies ?? []} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: actors } = await ActorService.getAll();

    return {
      paths: actors.map((actor) => ({
        params: { slug: actor.slug },
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

export const getStaticProps: GetStaticProps<IActorPageProps> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (!slug || Array.isArray(slug)) return { notFound: true };

  try {
    const { data: actor } = await ActorService.getBySlug(slug);

    if (!actor) return { notFound: true };

    const { data: movies } = await MovieService.getByActor(actor._id);

    return {
      props: {
        actor,
        movies,
      },
    };
  } catch (e) {
    console.warn(errorCatch(e));

    return {
      notFound: true,
    };
  }
};

export default ActorPage;
