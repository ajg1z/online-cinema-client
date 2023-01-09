import { FC } from 'react';

import Meta from '@/utils/meta/Meta';

import Description from '@/components/ui/heading/Description';
import Heading from '@/components/ui/heading/Heading';

import CollectionItem from './CollectionItem';
import styles from './Collections.module.scss';
import { ICollection } from './collections.types';

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
  return (
    <Meta
      title='Discovery'
      description='In this section you will find all genres on our site'
    >
      <Heading className={styles.heading}>Discovery</Heading>
      <Description
        text='In this section you will find all genres on our site'
        className={styles.description}
      />
      <section className={styles.collections}>
        {collections.map((collection) => (
          <CollectionItem key={collection._id} collection={collection} />
        ))}
      </section>
    </Meta>
  );
};

export default Collections;
