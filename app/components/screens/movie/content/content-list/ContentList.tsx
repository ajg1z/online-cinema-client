import Link from 'next/link';
import { FC, Fragment } from 'react';

import { IContentList } from '../content.types';

import styles from './ContentList.module.scss';

const ContentList: FC<IContentList> = ({ links, name }) => {
  return (
    <div className={styles.list}>
      <div className={styles.name}>{name}</div>
      <ul className={styles.links}>
        {links.map(({ link, title, _id }, index) => (
          <Fragment key={_id}>
            <Link key={_id} href={link}>
              {title}
            </Link>
            {index + 1 !== links.length ? `, ` : ``}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ContentList;
