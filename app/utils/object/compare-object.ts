import { isEqual } from 'lodash';

import { ObjectType } from '@/shared/types/object';

/**
 * @a new options;
 * @b init options;
 */
export function compareObj<T = any>(a: Record<any, any>, b: Record<any, any>) {
  const payload: ObjectType = {};

  Object.keys(a).forEach((key) => {
    if (b[key] === undefined) return;
    if (typeof a[key] !== `object`) {
      if (a[key] !== b[key]) payload[key] = a[key];
      return;
    }

    if (!isEqual(a[key], b[key])) payload[key] = a[key];
  });

  return {
    payload: payload as T,
    isUpdate: !!Object.keys(payload).length,
  };
}
