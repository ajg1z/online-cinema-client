import { PAGES_URL } from '../../../config/url.config';

import { IAdminNavItem } from './admin-navigation.types';

export const AdminNavItems: IAdminNavItem[] = [
  { link: PAGES_URL.admin(``), title: `Statistics` },
  { link: PAGES_URL.admin(`users`), title: `Users` },
  { link: PAGES_URL.admin(`movies`), title: `Movies` },
  { link: PAGES_URL.admin(`actors`), title: `Actors` },
  { link: PAGES_URL.admin(`genres`), title: `Genres` },
];
