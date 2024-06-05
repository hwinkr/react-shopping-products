import { useState, useCallback } from 'react';

export default function usePagination() {
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const handleLastPage = useCallback((isLast: boolean) => {
    if (isLast) {
      setIsLastPage(true);
    }
  }, []);

  const resetPage = () => setPage(0);

  const setNextPage = useCallback(() => setPage((prevPage) => prevPage + 1), [setPage]);

  return {
    page,
    setNextPage,
    resetPage,
    isLastPage,
    handleLastPage,
  };
}
