import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Meta from '@/utils/meta/Meta';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import Button from '@/components/ui/form/Button';

import Heading from '@/ui/heading/Heading';

import AuthFields from './AuthFields';
import styles from './auth.module.scss';
import { AuthType, IAuthInput } from './auth.types';
import { useAuthRedirect } from './useAuthRedirect';

const Auth = () => {
  useAuthRedirect();

  const [type, setType] = useState<AuthType>(`login`);

  const { register, login } = useActions();

  const { isLoading } = useTypedSelector((state) => state.user);

  const {
    register: registerForm,
    reset,
    formState,
    handleSubmit,
  } = useForm<IAuthInput>({
    mode: `onBlur`,
  });

  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
    if (type === `login`) {
      login(data);
    }

    if (type === `register`) {
      register(data);
    }
  };

  return (
    <Meta title='auth'>
      <section className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Heading className={styles.title}>Auth</Heading>
          <AuthFields
            formState={formState}
            register={registerForm}
            isPasswordRequired
          />
          <div className={styles.buttons}>
            <Button
              disabled={isLoading}
              type='submit'
              onClick={() => setType(`login`)}
            >
              Login
            </Button>
            <Button
              disabled={isLoading}
              type='submit'
              onClick={() => setType(`register`)}
            >
              Register
            </Button>
          </div>
        </form>
      </section>
    </Meta>
  );
};

export default Auth;
