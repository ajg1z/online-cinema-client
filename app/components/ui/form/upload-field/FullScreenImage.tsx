import Image from 'next/image';
import { FC } from 'react';
import ReactModal from 'react-modal';

import NotFoundImg from '@/assets/images/notFoundImg.jpg';

import MaterialIcon from '../../material-icon/MaterialIcon';
import styles from '../form.module.scss';

interface IFullScreenImageProps {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}

const FullScreenImage: FC<IFullScreenImageProps> = ({
  isOpen,
  src,
  onClose,
}) => {
  return (
    <ReactModal isOpen={isOpen}>
      <div className={styles.fullScreenWrapper}>
        <button onClick={onClose}>
          <MaterialIcon name='MdClose' />
        </button>
        <Image alt='' width={600} height={350} src={src || NotFoundImg} />
      </div>
    </ReactModal>
  );
};

export default FullScreenImage;
