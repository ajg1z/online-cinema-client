import cn from 'classnames';
import { FC } from 'react';

import styles from './form.module.scss';
import { IButtonProps } from './form.types';

const Button: FC<IButtonProps> = ({ className, children, ...params }) => {
  return (
    <button {...params} className={cn(styles.button, className)}>
      {children}
    </button>
  );
};

export default Button;
