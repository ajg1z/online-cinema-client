import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

import styles from './form.module.scss';
import { IInputProps } from './form.types';

const Field = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      placeholder,
      error,
      containerStyle,
      type,
      isNumber,
      ...params
    }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={cn(styles.common, styles.field)} style={containerStyle}>
        <label>
          <span>{placeholder}</span>
          <input type={type} ref={ref} {...params} />
        </label>
        {error && <span className={styles.error}>{error.message}</span>}
      </div>
    );
  },
);

Field.displayName = `Field`;

export default Field;
