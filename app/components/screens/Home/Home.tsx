import { FC } from 'react';
import { toastr } from 'react-redux-toastr';

import Meta from '@/utils/meta/Meta';

import { Gallery } from '@/components/ui/gallery/Gallery';
import Heading from '@/components/ui/heading/Heading';
import Slider from '@/components/ui/slider/Slider';

import { IHome } from './home.types';

const Home: FC<IHome> = ({ slides, actors, trendingMovies }) => {
  return (
    <>
      <Meta
        title='Watch movie online'
        description='Watch MovieApp movies and TV shows online or stream right to your browser'
      >
        {slides.length && <Slider slides={slides} />}

        <div className='my-10'>
          <Heading>Trending now</Heading>
          {trendingMovies.length && <Gallery items={trendingMovies} />}
        </div>

        <div className='my-10'>
          <Heading>Best actors</Heading>
          {actors.length && <Gallery items={actors} />}
        </div>
      </Meta>
    </>
  );
};

export default Home;
