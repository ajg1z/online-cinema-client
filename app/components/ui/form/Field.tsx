import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

import styles from './form.module.scss';
import { IFieldProps } from './form.types';

const Field = forwardRef<HTMLInputElement, IFieldProps>(
  (
    { placeholder, error, containerStyle, type, ...params }: IFieldProps,
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
