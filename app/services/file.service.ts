import axios from 'api/interceptors';

import { IFile } from '@/shared/types/file.types';

import { API_URL } from './../config/api.config';

export const FileService = {
  async upload(files: FormData, folder?: string) {
    return axios.post<string[]>(API_URL.file(), files, {
      params: { authorType: folder },
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
