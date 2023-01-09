import { useEffect, useMemo, useState } from 'react';

import { IAdminTableRow } from './admin-table.types';

export const usePagesIndex = (
  rows: IAdminTableRow[],
  countRowsInPage: number,
  searchValue?: string,
  filter?: (el: any) => boolean,
) => {
  const [currentPage, setCurrentPage] = useState(0);

  const countPage = useMemo(() => {
    const countRows =
      filter && searchValue
        ? rows.filter((el) => filter(el)).length
        : rows.length;

    if (countRows === countRowsInPage) return 0;

    if (countRowsInPage > countRows) Math.ceil(countRows / countRowsInPage);

    return Math.floor(countRows / countRowsInPage);
  }, [rows, countRowsInPage, filter, searchValue]);

  useEffect(() => {
    if (currentPage > countPage) {
      setCurrentPage(countPage);
    }
  }, [countPage, currentPage]);

  const isNextPage = currentPage + 1 <= countPage;
  const isPrevPage = currentPage - 1 >= 0;

  const nextPage = (end?: boolean) => {
    if (end) {
      return setCurrentPage(countPage);
    }

    if (isNextPage) setCurrentPage((state) => state + 1);
  };

  const prevPage = (start?: boolean) => {
    if (start) {
      return setCurrentPage(0);
    }

    if (isPrevPage) setCurrentPage((state) => state - 1);
  };

  return {
    isNextPage,
    isPrevPage,
    countPage,
    currentPage,
    nextPage,
    prevPage,
  };
};
