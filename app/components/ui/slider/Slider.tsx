import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import SlideItem from './SlideItem';
import styles from './Slider.module.scss';
import SlideArrow from './slide-arrow/SlideArrow';
import { ISlide } from './slider.types';
import { useSlider } from './useSlider';

interface ISliderProps {
  slides: ISlide[];
  buttonTitle?: string;
}

const Slider: FC<ISliderProps> = ({ slides, buttonTitle }) => {
  const {
    currentIdx,
    handleArrowDirection,
    isExistNext,
    isExistPrev,
    slideIn,
  } = useSlider(slides.length);

  return (
    <div className={styles.slider}>
      <CSSTransition
        in={slideIn}
        unmountOnExit
        classNames='slide-animation'
        timeout={300}
      >
        <SlideItem buttonTitle={buttonTitle} slide={slides[currentIdx]} />
      </CSSTransition>

      {isExistPrev && (
        <SlideArrow
          variant='left'
          onClick={() => handleArrowDirection(`prev`)}
        />
      )}

      {isExistNext && (
        <SlideArrow
          variant='right'
          onClick={() => handleArrowDirection(`next`)}
        />
      )}
    </div>
  );
};

export default Slider;
