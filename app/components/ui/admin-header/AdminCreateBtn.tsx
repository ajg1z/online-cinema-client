import React, { FC } from 'react';

import Button from '../form/Button';

interface IAdminCreateBtnProps {
  onClick: () => void;
}

const AdminCreateBtn: FC<IAdminCreateBtnProps> = ({ onClick }) => {
  return <Button onClick={onClick}>Create new</Button>;
};

export default AdminCreateBtn;
