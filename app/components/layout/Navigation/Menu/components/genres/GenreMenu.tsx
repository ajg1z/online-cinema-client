import React from 'react';

import { usePopularGenres } from './usePopularGenres';

const GenreMenu = () => {
  const {} = usePopularGenres();
  return <div>GenreMenu</div>;
};

export default GenreMenu;
