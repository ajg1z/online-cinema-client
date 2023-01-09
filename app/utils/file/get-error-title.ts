import { FileType } from '@/shared/types/file.types';

export function getErrorTitle(type: FileType) {
  switch (type) {
    case `image`:
      return `Select file format - image(jpg,png,webp...)`;
    case `pdf`:
      return `Select file format - pdf`;
    case `video`:
      return `Select file format - video`;
    default:
      return ``;
  }
}
