import React from 'react';

import { FCC } from '@/shared/types/react.types';

import { IHeadingProps } from './heading.types';

const Heading: FCC<IHeadingProps> = ({ className, children, ...props }) => {
  return (
    <h1
      {...props}
      className={`text-white font-semibold text-opacity-80 text-3xl ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
