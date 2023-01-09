import { useCallback, useMemo, useState } from 'react';

export function useSlider(length: number) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  const isExistNext = currentIdx + 1 < length;
  const isExistPrev = currentIdx ? currentIdx - 1 < length : false;

  const handleArrowDirection = useCallback(
    (direction: `next` | `prev`) => {
      const newIndex = direction === `next` ? currentIdx + 1 : currentIdx - 1;
      setSlideIn(false);

      setTimeout(() => {
        setCurrentIdx(newIndex);
        setSlideIn(true);
      }, 300);
    },
    [currentIdx],
  );

  return useMemo(
    () => ({
      isExistNext,
      isExistPrev,
      handleArrowDirection,
      currentIdx,
      slideIn,
    }),
    [currentIdx, handleArrowDirection, isExistNext, isExistPrev, slideIn],
  );
}
