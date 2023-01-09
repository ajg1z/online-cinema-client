import React from 'react';
import { useForm } from 'react-hook-form';

import Meta from '@/utils/meta/Meta';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import GenreForm from '@/components/ui/form/GenreForm';
import Heading from '@/components/ui/heading/Heading';

import { IGenreEditForm } from './genre-edit.types';
import useGenreEdit from './useGenreEdit';

const GenreEdit = () => {
  const form = useForm<IGenreEditForm>({ mode: `onChange` });

  const { isLoading, onSubmit } = useGenreEdit(form.setValue);

  return (
    <Meta title='Edit genre'>
      <AdminNavigation />
      <Heading>Edit genre</Heading>
      <GenreForm
        buttonText='Update'
        isLoading={isLoading}
        onSubmit={onSubmit}
        form={form}
      />
    </Meta>
  );
};

export default GenreEdit;
