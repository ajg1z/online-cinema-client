import cn from 'classnames';
import React from 'react';
import { useQuery } from 'react-query';

import { AdminService } from '@/services/admin.service';

import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import styles from '../Admin.module.scss';

const CountUsers = () => {
  const { isLoading, data: response } = useQuery(
    `count-users`,
    AdminService.getCountUsers,
  );

  return (
    <div className={cn(styles.block, styles.countUsers)}>
      {isLoading ? (
        <SkeletonLoader className='h-3 w-11' />
      ) : (
        <div className={styles.number}>{response?.data}</div>
      )}
      <div className={styles.description}>users</div>
    </div>
  );
};

export default CountUsers;
