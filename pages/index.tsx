import { errorCatch } from 'api/api.helpers';
import { GetStaticProps, NextPage } from 'next';

import { PAGES_URL } from '@/config/url.config';

import { getGenreList, getGenresListEach } from '@/utils/movie/helpers';

import { ActorService } from '@/services/actor-service/actor.service';
import MovieService from '@/services/movie/movie.service';

import Home from '@/components/screens/home/Home';
import { IHome } from '@/components/screens/home/home.types';
import { IGalleryItem } from '@/components/ui/gallery/gallery.types';
import { ISlide } from '@/components/ui/slider/slider.types';

const HomePage: NextPage<IHome> = ({ actors, slides, trendingMovies }) => {
  return (
    <Home actors={actors} slides={slides} trendingMovies={trendingMovies} />
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<IHome> = async () => {
  try {
    const { data: movies } = await MovieService.getAll();
    const { data: actors } = await ActorService.getAll();
    const popularMovies = await MovieService.getPopular();

    const slides: ISlide[] = movies.map((movie) => ({
      _id: movie._id,
      bigPoster: movie.bigPoster,
      link: PAGES_URL.movie(movie.slug),
      title: movie.title,
      subTitle: getGenreList(movie.genres),
    }));

    const trendingGallery: IGalleryItem[] = popularMovies.map((movie) => ({
      link: PAGES_URL.movie(movie.slug),
      name: movie.title,
      posterPath: movie.poster,
    }));

    const actorsGallery: IGalleryItem[] = actors.slice(0, 7).map((actor) => ({
      link: PAGES_URL.actor(actor.slug),
      name: actor.name,
      posterPath: actor.photo[0],
      content: {
        title: actor.name,
        subTitle: `+${actor.countMovies} movies`,
      },
    }));

    return {
      props: {
        slides,
        actors: actorsGallery,
        trendingMovies: trendingGallery,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.warn(errorCatch(e));

    return {
      props: {
        slides: [],
        actors: [],
        trendingMovies: [],
      },
    };
  }
};
