import Image from 'next/image';
import { FC } from 'react';

import NotFoundImage from '@/assets/images/notFoundImg.jpg';

import { ICollection } from './collections.types';

const CollectionImage: FC<{ collection: ICollection }> = ({ collection }) => {
  return (
    <Image
      fill
      src={collection.image || NotFoundImage}
      alt={collection.title}
      draggable={false}
    />
  );
};

export default CollectionImage;
