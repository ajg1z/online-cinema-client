import { FC } from 'react';

import Meta from '@/utils/meta/Meta';

import Heading from '@/components/ui/heading/Heading';

import { IHome } from './home.types';

const Home: FC<IHome> = () => {
  return (
    <>
      <Meta
        title='Watch movie online'
        description='Watch MovieApp movies and TV shows online or stream right to your browser'
      >
        <Heading className='text-gray-500 mb-8 text-xl'>
          Watch movie online
        </Heading>
      </Meta>
    </>
  );
};

export default Home;
