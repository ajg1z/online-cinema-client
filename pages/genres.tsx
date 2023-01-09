import { GetStaticProps, NextPage } from 'next';
import React from 'react';

import Collections from '@/screens/collections/Collections';

import GenreService from '@/services/genre/genre.service';

import { ICollection } from '@/components/screens/collections/collections.types';

import Error404 from './404';

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
  collections,
}) => {
  return collections ? <Collections collections={collections} /> : <Error404 />;
};

export const getStaticProps: GetStaticProps<{
  collections: ICollection[];
}> = async () => {
  try {
    const { data: collections } = await GenreService.getCollections();

    return {
      props: { collections },
      revalidate: 60,
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};

export default GenresPage;
