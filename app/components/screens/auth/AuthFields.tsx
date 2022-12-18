import React from 'react';
import { FieldError, FormState, UseFormRegister } from 'react-hook-form';

import { validEmail } from '@/shared/regex';

import Field from '@/components/ui/form/Field';

interface IAuthFieldsProps {
  register: UseFormRegister<any>;
  formState: FormState<any>;
  isPasswordRequired?: boolean;
}

const AuthFields: React.FC<IAuthFieldsProps> = ({
  formState: { errors },
  register,
  isPasswordRequired = false,
}) => {
  return (
    <>
      <Field
        placeholder='e-mail'
        error={errors.email as FieldError}
        type='input'
        {...register(`email`, {
          required: `Email is required`,
          pattern: {
            value: validEmail,
            message: `Please enter a valid email`,
          },
        })}
      />

      <Field
        placeholder='password'
        error={errors.password as FieldError}
        type='password'
        {...register(
          `password`,
          isPasswordRequired
            ? {
                required: `Password is required`,
                minLength: {
                  value: 6,
                  message: `Please enter min 6 symbol`,
                },
              }
            : undefined,
        )}
      />
    </>
  );
};

export default AuthFields;
