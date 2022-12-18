export const PAGES_URL = {
  movie: (slug: string) => `/movie/${slug}`,
  actor: (slug: string) => `/actor/${slug}`,
  genre: (slug: string) => `/genre/${slug}`,
  admin: (url?: string) => `/manage${url ? `/${url}` : ''}`,
  auth: () => `/auth`,
  404: () => `/404`,
};
