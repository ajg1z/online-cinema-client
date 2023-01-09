import React, { ChangeEvent, FC } from 'react';

import SearchField from '../search-field/SearchField';

import AdminCreateBtn from './AdminCreateBtn';
import styles from './AdminHeader.module.scss';

interface IAdminHeaderProps {
  onClick?: () => void;
  searchTerm: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<IAdminHeaderProps> = ({
  handleSearch,
  searchTerm,
  onClick,
}) => {
  return (
    <div className={styles.header}>
      <SearchField value={searchTerm} handleChange={handleSearch} />
      {onClick && <AdminCreateBtn onClick={onClick} />}
    </div>
  );
};

export default AdminHeader;
