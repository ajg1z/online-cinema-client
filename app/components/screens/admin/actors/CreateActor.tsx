import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { toastError } from '@/utils/toast-error';

import ActorForm from '@/components/ui/form/ActorForm';
import Modal from '@/components/ui/modal/Modal';

import { IActorEditForm } from '../actor/actor-edit.types';

interface ICreateActorProps {
  isOpen: boolean;
  createActor: (payload: IActorEditForm) => void;
  onClose: () => void;
  isLoading: boolean;
}

const CreateActor: FC<ICreateActorProps> = ({
  isOpen,
  createActor,
  onClose,
  isLoading,
}) => {
  const form = useForm<IActorEditForm>({ mode: 'onChange' });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (payload: IActorEditForm) => {
    try {
      await createActor(payload);
      handleClose();
    } catch (e) {
      toastError(e, `create actor`);
    }
  };

  return (
    <Modal
      title='Create actor'
      width='50%'
      isOpen={isOpen}
      onClose={handleClose}
      hideFooter
    >
      <ActorForm
        submitLoading={isLoading}
        buttonText='Create'
        onSubmit={onSubmit}
        form={form}
      />
    </Modal>
  );
};

export default CreateActor;
