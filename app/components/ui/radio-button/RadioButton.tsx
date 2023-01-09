/* eslint-disable no-debugger */
import cn from 'classnames';
import React, { ForwardedRef } from 'react';

import KEYS from '@/shared/keys.constans';

import styles from './RadioButton.module.scss';
import { RadioProps } from './radio-button.types';

// eslint-disable-next-line react/display-name
const RadioButton = React.forwardRef(
  (
    { className, label, reverse, checked, ...args }: RadioProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const labelRef = React.useRef<HTMLLabelElement | null>(null);

    const handleKeyDown = (key: React.KeyboardEvent) => {
      if (key.code === KEYS.SPACE || key.code === KEYS.ENTER) {
        if (labelRef.current) labelRef.current?.click();
        key.preventDefault();
      }
    };

    return (
      <label ref={labelRef} className={cn(styles.container, className)}>
        <input
          checked={checked}
          ref={ref}
          className={styles.input}
          type='radio'
          {...args}
        />
        <span className={styles.check}>
          <span
            className={cn(styles.checked, {
              [styles.active]: checked,
            })}
          />
        </span>
        <span tabIndex={0} onKeyDown={handleKeyDown} className={styles.text}>
          {label}
        </span>
      </label>
    );
  },
);

export default RadioButton;
