import cn from 'classnames';
import { FC } from 'react';

import tableStyles from '../AdminTable.module.scss';
import { Align } from '../admin-table.types';
import { getBooleanValue } from '../getBooleanValue';

import styles from './AdminTableBody.module.scss';

interface IBodyCellProps {
  value: any;
  align?: Align;
  width?: number;
}

const BodyCell: FC<IBodyCellProps> = ({ value, align, width }) => {
  return (
    <div
      style={{ textAlign: align ?? 'left', width }}
      className={cn(tableStyles.cell, styles.cell)}
    >
      {typeof value === 'boolean' ? getBooleanValue(value) : value}
    </div>
  );
};

export default BodyCell;
