import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { toastError } from '@/utils/toast-error';

import GenreForm from '@/components/ui/form/GenreForm';
import Modal from '@/components/ui/modal/Modal';

import { IGenreEditForm } from '../genre/genre-edit.types';

interface ICreateGenreProps {
  isOpen: boolean;
  createGenre: (payload: IGenreEditForm) => void;
  onClose: () => void;
}

const CreateGenre: FC<ICreateGenreProps> = ({
  isOpen,
  createGenre,
  onClose,
}) => {
  const form = useForm<IGenreEditForm>({ mode: 'onChange' });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (payload: IGenreEditForm) => {
    try {
      await createGenre(payload);
      handleClose();
    } catch (e) {
      toastError(e, `create genre`);
    }
  };

  return (
    <Modal
      title='Create genre'
      width='80%'
      isOpen={isOpen}
      onClose={handleClose}
      hideFooter
    >
      <GenreForm buttonText='Create' onSubmit={onSubmit} form={form} />
    </Modal>
  );
};

export default CreateGenre;
