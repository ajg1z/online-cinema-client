import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { toastr } from 'react-redux-toastr';

import { getErrorTitle } from '@/utils/file/get-error-title';

import { FileType } from '@/shared/types/file.types';

export const useUpload = (onChange: (...e: any[]) => void, type: FileType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(0);
  const [finishProgress, setFinishProgress] = useState(0);

  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (files: FileList, e?: ChangeEvent<HTMLInputElement>) => {
      try {
        if (!files?.length) return;

        const file = files[0];

        const [fileType] = file.type.split(`/`);

        if (fileType !== type) {
          toastr.error(`Invalid file type`, getErrorTitle(type));
          return;
        }

        setIsLoading(true);
        setName(file.name);
        onChange(file);

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onerror = () => {
          toastr.error(`Error in read file`, `Wrong or break file`);
        };

        reader.onloadstart = (e) => {
          setFinishProgress(e.total);
        };

        reader.onprogress = (e) => {
          setProgress(e.loaded);
        };

        reader.onload = () => {
          setFileUrl(reader.result as string);
          setIsLoading(false);
        };
      } catch (e) {
        toastr.error(`Error in read file`, `Wrong or break file`);
      }
    },
    [onChange, type],
  );

  return useMemo(
    () => ({
      uploadFile,
      isLoading,
      progress,
      finishProgress,
      fileUrl,
      name,
    }),
    [fileUrl, finishProgress, isLoading, progress, uploadFile, name],
  );
};
