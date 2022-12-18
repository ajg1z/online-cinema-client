import { CSSProperties, DetailedHTMLProps } from 'react';
import { FieldError } from 'react-hook-form';

export interface IButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export interface IFieldProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  placeholder: string;
  error?: FieldError;
  containerStyle?: CSSProperties;
}
