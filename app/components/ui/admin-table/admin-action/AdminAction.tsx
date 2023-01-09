import { useRouter } from 'next/router';
import { FC } from 'react';

import MaterialIcon from '@/components/ui/material-icon/MaterialIcon';

import styles from './AdminAction.module.scss';

interface IAdminActionProps {
  value?: {
    editUrl: string;
    removeHandler: (id: string) => void;
    id: string;
  };
}

const AdminAction: FC<IAdminActionProps> = ({ value }) => {
  const { push } = useRouter();
  if (!value) return null;

  return (
    <div className={styles.actions}>
      <button onClick={() => push(value?.editUrl)}>
        <MaterialIcon name='MdEdit' />
      </button>

      <button onClick={() => value?.removeHandler(value?.id)}>
        <MaterialIcon name='MdClose' />
      </button>
    </div>
  );
};

export default AdminAction;
