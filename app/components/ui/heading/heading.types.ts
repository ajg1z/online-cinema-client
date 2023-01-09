import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IHeadingProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

export interface IDescriptionProps {
  className?: string;
  text: string;
}
