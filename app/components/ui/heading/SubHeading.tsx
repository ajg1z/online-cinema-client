import cn from 'classnames';
import React from 'react';

import { FCC } from '@/shared/types/react.types';

import { IHeadingProps } from './heading.types';

const SubHeading: FCC<IHeadingProps> = ({ className, children, ...rest }) => {
  return (
    <h2
      {...rest}
      className={cn(className, `text-white text-xl mb-5 font-semibold`)}
    >
      {children}
    </h2>
  );
};

export default SubHeading;
