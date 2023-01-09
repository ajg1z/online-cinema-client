import { FC } from 'react';
import ReactSelect, { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';

import formStyles from '../form/form.module.scss';

import styles from './select.module.scss';
import { ISelectOption, ISelectProps } from './select.types';

const animatedComponents = makeAnimated();

const Select: FC<ISelectProps> = ({
  field,
  options,
  error,
  isLoading,
  isMulti,
  placeholder,
  containerStyle,
}) => {
  const onChange = (
    newValue: unknown | OnChangeValue<ISelectOption, boolean>,
  ) => {
    field.onChange(
      isMulti
        ? (newValue as ISelectOption[]).map((el) => el.value)
        : (newValue as ISelectOption).value,
    );
  };

  const getValue = () => {
    if (field.value) {
      return isMulti
        ? options.filter((el) => field.value.indexOf(el.value) >= 0)
        : options.find((el) => el.value === field.value);
    } else return isMulti ? [] : ``;
  };

  return (
    <div style={containerStyle} className={styles.selectContainer}>
      <label>
        <span>{placeholder}</span>
        <ReactSelect
          isMulti={isMulti}
          classNamePrefix='custom-select'
          options={options}
          value={getValue()}
          isLoading={isLoading}
          components={animatedComponents}
          onChange={onChange}
          placeholder=''
        />
      </label>
      {error && <div className={formStyles.error}>{error.message}</div>}
    </div>
  );
};

export default Select;
