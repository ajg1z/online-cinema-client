import classNames from 'classnames';
import { FC } from 'react';

import MaterialIcon from '../../material-icon/MaterialIcon';

import styles from './SlideArrow.module.scss';

interface ISlideArrowProps {
  variant: `left` | `right`;
  onClick: () => void;
}

const SlideArrow: FC<ISlideArrowProps> = ({ onClick, variant }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.arrow, {
        [styles.left]: variant === `left`,
        [styles.right]: variant === `right`,
      })}
    >
      <MaterialIcon
        name={variant === `left` ? `MdChevronLeft` : `MdChevronRight`}
      />
    </button>
  );
};

export default SlideArrow;
