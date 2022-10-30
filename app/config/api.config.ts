export const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const Url = {
  genre(path?: string) {
    return `/genre/${path || ''}`;
  },
  user(path: string) {
    return `/user/${path || ''}`;
  },
  auth(path: string) {
    return `/auth/${path || ''}`;
  },
  movie(path?: string) {
    return `/movie/${path || ''}`;
  },
  actor(path: string) {
    return `/actor/${path || ''}`;
  },
  rating(path: string) {
    return `/rating/${path || ''}`;
  },
  file(path: string) {
    return `/file/${path || ''}`;
  },
};
