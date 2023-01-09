import cn from 'classnames';
import { FC } from 'react';

import MaterialIcon from '../../material-icon/MaterialIcon';

import styles from './AdminTableFooter.module.scss';

interface IAdminTableFooterProps {
  currentPage: number;
  countPage: number;
  next: (end?: boolean) => void;
  prev: (start?: boolean) => void;
  isNextPage: boolean;
  isPrevPage: boolean;
}

const AdminTableFooter: FC<IAdminTableFooterProps> = ({
  countPage,
  next,
  currentPage,
  prev,
  isNextPage,
  isPrevPage,
}) => {
  return (
    <div className={styles.footer}>
      <button
        title='to start'
        disabled={currentPage === 0}
        onClick={() => prev(true)}
        className={cn(styles.bttn, { [styles.disabled]: currentPage === 0 })}
      >
        <MaterialIcon name='MdArrowBack' />
      </button>

      <button
        disabled={!isPrevPage}
        title='prev page'
        onClick={() => prev()}
        className={cn(styles.bttn, { [styles.disabled]: !isPrevPage })}
      >
        <MaterialIcon name='MdArrowLeft' />
      </button>

      <div className={styles.pageNumber}>
        {currentPage + 1} / {countPage + 1}
      </div>

      <button
        disabled={!isNextPage}
        title='next page'
        onClick={() => next()}
        className={cn(styles.bttn, { [styles.disabled]: !isNextPage })}
      >
        <MaterialIcon name='MdArrowRight' />
      </button>

      <button
        disabled={countPage === currentPage}
        title='to end'
        onClick={() => next(true)}
        className={cn(styles.bttn, {
          [styles.disabled]: countPage === currentPage,
        })}
      >
        <MaterialIcon name='MdArrowForward' />
      </button>
    </div>
  );
};

export default AdminTableFooter;
