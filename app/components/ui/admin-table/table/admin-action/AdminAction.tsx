import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { PAGES_URL } from '@/config/url.config';

import MaterialIcon from '@/components/ui/material-icon/MaterialIcon';

import styles from './AdminAction.module.scss';

interface IAdminActionProps {
  editUrl: string;
  removeHandler: (id: string) => void;
  id: string;
}

const AdminAction: FC<IAdminActionProps> = ({ editUrl, removeHandler, id }) => {
  const { push } = useRouter();
  return (
    <div className={styles.actions}>
      <button onClick={() => push(editUrl)}>
        <MaterialIcon name='MdEdit' />
      </button>

      <button onClick={() => removeHandler(id)}>
        <MaterialIcon name='MdClose' />
      </button>
    </div>
  );
};

export default AdminAction;
