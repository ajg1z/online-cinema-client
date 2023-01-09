import ReactModal from 'react-modal';

import { FCC } from '@/shared/types/react.types';

import MaterialIcon from '../material-icon/MaterialIcon';

import styles from './Modal.module.scss';

interface IModalProps {
  onClose: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  isOpen: boolean;
  closeText?: string;
  saveText?: string;
  title?: string;
  cancelText?: string;
  width?: number | string;
  hideFooter?: boolean;
}

const Modal: FCC<IModalProps> = ({
  onCancel,
  onClose,
  onSave,
  isOpen,
  children,
  cancelText,
  closeText,
  saveText,
  title,
  width,
  hideFooter,
}) => {
  return (
    <ReactModal
      style={{
        content: {
          width,
          paddingBottom: hideFooter ? 10 : 0,
        },
        overlay: {
          alignContent: 'center',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgb(17,24,39,0.9)',
          justifyContent: 'center',
        },
      }}
      className={styles.modal}
      isOpen={isOpen}
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {title && <h1 className={styles.title}>{title}</h1>}
          <button onClick={onClose} className={styles.closeIcon}>
            <MaterialIcon name='MdClose' />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {!hideFooter && (
          <div className={styles.footer}>
            {onSave && <button onClick={onSave}>{saveText ?? 'Save'}</button>}
            {onCancel && (
              <button onClick={onCancel}>{cancelText ?? 'Cancel'}</button>
            )}
            <button onClick={onClose}>{closeText ?? 'Close'}</button>
          </div>
        )}
      </div>
    </ReactModal>
  );
};

export default Modal;
