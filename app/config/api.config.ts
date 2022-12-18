export const BASE_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const API_URL = {
  genre(path?: string) {
    return `/genre/${path || ''}`;
  },
  user(path?: string) {
    return `/user/${path || ''}`;
  },
  auth(path?: string) {
    return `/auth/${path || ''}`;
  },
  movie(path?: string) {
    return `/movie/${path || ''}`;
  },
  actor(path?: string) {
    return `/actor/${path || ''}`;
  },
  rating(path?: string) {
    return `/rating/${path || ''}`;
  },
  file(path?: string) {
    return `/file/${path || ''}`;
  },
};

export const JWT_EXPIRED = `jwt expired`;
export const JWT_MUST_BE_PROVIDED = `jwt must be provided`;
