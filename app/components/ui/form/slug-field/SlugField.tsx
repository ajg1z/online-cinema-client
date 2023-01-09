import { CSSProperties, FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import Field from '../Field';

import styles from './SlugField.module.scss';

interface ISlugFieldProps {
  generate: () => void;
  register: UseFormRegister<any>;
  error?: FieldError;
  containerStyle?: CSSProperties;
}

const SlugField: FC<ISlugFieldProps> = ({
  generate,
  register,
  error,
  containerStyle,
}) => {
  return (
    <div style={containerStyle} className='relative'>
      <Field
        {...register(`slug`, {
          required: `slug is required`,
        })}
        placeholder='Slug'
        error={error}
      />

      <button type='button' className={styles.badge} onClick={generate}>
        generate
      </button>
    </div>
  );
};

export default SlugField;
