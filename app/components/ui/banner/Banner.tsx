import Image from 'next/image';
import { FC } from 'react';

import NotFoundImg from '@/assets/images/notFoundImg.jpg';

import styles from './Banner.module.scss';

interface IBannerProps {
  image: string;
  Detail?: FC | string;
  alt: string;
}

const Banner: FC<IBannerProps> = ({ image, Detail, alt }) => {
  return (
    <div className={styles.banner}>
      <Image
        alt={alt}
        src={image || NotFoundImg}
        fill
        className='image-like-bg object-top'
        unoptimized
        priority
      />
      {Detail && <Detail />}
    </div>
  );
};

export default Banner;
