import { CSSProperties } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Options } from 'react-select';

import { IFieldProps } from './../form/form.types';

export interface ISelectOption {
  label: string;
  value: string;
}

export interface ISelectProps extends IFieldProps {
  options: Options<ISelectOption>;
  isMulti?: boolean;
  field: ControllerRenderProps<any, any>;
  isLoading?: boolean;
  containerStyle?: CSSProperties;
}
