import cn from 'classnames';
import parse from 'html-react-parser';
import { FC } from 'react';

import { IDescriptionProps } from './heading.types';

const Description: FC<IDescriptionProps> = ({ text, className }) => {
  return (
    <div
      className={cn(className, 'text-lg font-light text-white text-opacity-60')}
    >
      {parse(text)}
    </div>
  );
};

export default Description;
