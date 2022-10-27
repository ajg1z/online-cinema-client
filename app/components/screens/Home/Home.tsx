import { FC } from 'react';

import Layout from '@/components/layout/Layout';

import { IHome } from './Home.interface';

const Home: FC<IHome> = () => {
  return (
    <div>
      <Layout>home page</Layout>
    </div>
  );
};

export default Home;
