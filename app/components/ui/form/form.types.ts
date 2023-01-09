import { EditorProps } from 'draft-js';
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import { FileType } from '@/shared/types/file.types';

export interface IButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export interface IInputProps
  extends IFieldProps,
    DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {
  containerStyle?: CSSProperties;
  isNumber?: boolean;
}

export interface IFieldProps {
  placeholder?: string;
  error?: FieldError;
}

type TypeEditorPropsField = EditorProps & IFieldProps;

export interface ITextEditorProps
  extends Omit<TypeEditorPropsField, `editorState`> {
  onChange: (...e: any[]) => void;
  value: string;
}

export interface IUploadFieldProps
  extends IFieldProps,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  folder?: string;
  value?: string;
  onChange: (...e: any[]) => void;
  isNoImage?: boolean;
  type: FileType;
}
