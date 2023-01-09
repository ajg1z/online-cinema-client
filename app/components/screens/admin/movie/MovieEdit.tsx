import dynamic from 'next/dynamic';
import React from 'react';
import { useForm } from 'react-hook-form';

import Meta from '@/utils/meta/Meta';

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import MovieForm from '@/components/ui/form/MovieForm';
import Heading from '@/components/ui/heading/Heading';

import { IMovieEditForm } from './movie-edit.types';
import useMovieEdit from './useMovieEdit';

export const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false,
});

const MovieEdit = () => {
  const form = useForm<IMovieEditForm>({ mode: `onChange` });

  const { isLoading, onSubmit } = useMovieEdit(form.setValue);

  return (
    <Meta title='Edit Movie'>
      <AdminNavigation />
      <Heading>Edit movie</Heading>
      <MovieForm
        submitLoading={isLoading}
        buttonText='Update'
        onSubmit={onSubmit}
        form={form}
      />
    </Meta>
  );
};

export default MovieEdit;
