import React, { FC } from 'react';
import { HeaderGroup } from 'react-table';

import styles from './AdminTable.module.scss';

interface IAdminTableHeaderProps {
  headerGroups: HeaderGroup[];
}

const AdminTableHeader: FC<IAdminTableHeaderProps> = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((header) => (
        <tr {...header.getHeaderGroupProps()} key={header.id}>
          {header.headers.map((column) => (
            <th {...column.getHeaderProps()} key={column.id}>
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default AdminTableHeader;
