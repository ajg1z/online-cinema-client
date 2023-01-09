export interface IFile {
  size: number;
  name: string;
  type: FileType;
  authorType: AuthorTypeFile;
  _id: string;
  path: string;
}

export type FileType = `image` | `video` | 'pdf';
export type AuthorTypeFile = 'actor' | 'movie';

export interface IEditFile<T = string | string[]> {
  url: T;
  file?: File;
}
