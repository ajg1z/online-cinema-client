import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import NotFoundImg from '@/assets/images/notFoundImg.jpg';

import styles from './Slider.module.scss';
import { ISlide } from './slider.types';

interface ISlideItemProps {
  buttonTitle?: string;
  slide: ISlide;
}

const SlideItem: FC<ISlideItemProps> = ({ buttonTitle = `Watch`, slide }) => {
  const { push } = useRouter();

  return (
    <div className={styles.slide}>
      <Image
        alt={slide?.title ?? ``}
        className={styles.image}
        src={slide.bigPoster || NotFoundImg}
        unoptimized
        fill
        draggable={false}
        priority
      />

      <div className={styles.content}>
        {slide.title && <div className={styles.title}>{slide.title}</div>}

        {slide.subTitle && (
          <div className={styles.subTitle}>{slide.subTitle}</div>
        )}

        <button onClick={() => push(slide.link)} className={styles.button}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default SlideItem;
