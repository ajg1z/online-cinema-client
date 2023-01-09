import cn from 'classnames';
import Image from 'next/image';
import { FC, useMemo, useRef, useState } from 'react';

import SkeletonLoader from '../../skeleton-loader/SkeletonLoader';
import styles from '../form.module.scss';
import { IUploadFieldProps } from '../form.types';

import FullScreenImage from './FullScreenImage';
import { useUpload } from './useUpload';

const UploadField: FC<IUploadFieldProps> = ({
  onChange,
  error,
  folder,
  isNoImage = false,
  placeholder,
  value,
  type,
  className,
  ...rest
}) => {
  const { isLoading, uploadFile, fileUrl, finishProgress, progress, name } =
    useUpload(onChange, type);

  const [fullScreen, setFullScreen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const closeFullScreen = () => {
    setFullScreen(false);
  };

  const nameFile = useMemo(() => {
    if (!value) return 'Not selected file';
    return typeof value === 'string' ? value.split('/').slice().pop() : name;
  }, [name, value]);

  return (
    <>
      <FullScreenImage
        isOpen={fullScreen}
        src={fileUrl || value!}
        onClose={closeFullScreen}
      />
      <div
        {...rest}
        className={cn(styles.field, styles.uploadField, className)}
      >
        <div
          onDragOver={(e) => {
            e.currentTarget.style.outline = `1px solid var(--primary-color)`;
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.currentTarget.style.outline = `none`;
            e.preventDefault();
            e.stopPropagation();
            const files = e.dataTransfer.files;
            uploadFile(files);
          }}
          onDragLeave={(e) => (e.currentTarget.style.outline = `none`)}
          className={styles.uploadWrapper}
        >
          <div className={styles.uploadBody}>
            <span>{placeholder}</span>
            <input
              ref={inputRef}
              type='file'
              onChange={(e) => uploadFile(e.target.files!)}
            />
            <button
              onClick={() => inputRef.current?.click()}
              type='button'
              className={styles.selectorImage}
            >
              The select file
            </button>
            <div className={styles.nameFile}>{nameFile}</div>
            {error && <span className={styles.error}>{error.message}</span>}
          </div>

          {!isNoImage && (
            <div
              className={cn(styles.previewImage)}
              onDoubleClick={() => setFullScreen(true)}
            >
              {isLoading ? (
                <>
                  <SkeletonLoader className='w-32 h-32' />
                  <p className={styles.progress}>
                    {Math.round((progress * 100) / finishProgress)}/{100}
                  </p>
                </>
              ) : (
                (fileUrl || value) && (
                  <Image
                    src={fileUrl || value!}
                    alt=''
                    width={144}
                    height={144}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadField;
