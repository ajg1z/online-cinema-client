import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toastr } from 'react-redux-toastr';

import { toastError } from '@/utils/toast-error';

import MovieForm from '@/components/ui/form/MovieForm';
import Modal from '@/components/ui/modal/Modal';

import { IMovieEditForm } from '../movie/movie-edit.types';

interface ICreateMovieProps {
  isOpen: boolean;
  createMovie: (payload: IMovieEditForm) => void;
  onClose: () => void;
  isLoading: boolean;
}

const CreateMovie: FC<ICreateMovieProps> = ({
  isOpen,
  createMovie,
  onClose,
  isLoading,
}) => {
  const form = useForm<IMovieEditForm>({ mode: 'onChange' });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (payload: IMovieEditForm) => {
    try {
      await createMovie(payload);
      handleClose();
    } catch (e) {
      toastr.clean();
      toastError(e, `create movie`);
    }
  };

  return (
    <Modal
      title='Create movie'
      width='80%'
      isOpen={isOpen}
      onClose={handleClose}
      hideFooter
    >
      <MovieForm
        submitLoading={isLoading}
        buttonText='Create'
        onSubmit={onSubmit}
        form={form}
      />
    </Modal>
  );
};

export default CreateMovie;
