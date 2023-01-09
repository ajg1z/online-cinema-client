import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import Meta from '@/utils/meta/Meta';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import ActorForm from '@/components/ui/form/ActorForm';
import Heading from '@/components/ui/heading/Heading';

import { IActorEditForm } from './actor-edit.types';
import useActorEdit from './useActorEdit';

const ActorEdit = () => {
  const form = useForm<IActorEditForm>({ mode: `onBlur` });

  const { isLoading, onSubmit } = useActorEdit(form.setValue, `image`);

  return (
    <Meta title='Edit Actor'>
      <AdminNavigation />
      <Heading>Edit actor</Heading>
      <ActorForm
        buttonText='Update'
        isLoading={isLoading}
        onSubmit={onSubmit}
        form={form}
      />
    </Meta>
  );
};

export default ActorEdit;
