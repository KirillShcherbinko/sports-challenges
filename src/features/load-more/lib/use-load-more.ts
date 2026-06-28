import { useEffect, useState, useTransition } from 'react';

type TUseLoadMoreOptions<T> = {
  initialItems: T[];
  totalPages: number;
  loadMoreAction: (nextPage: number) => Promise<T[]>;
};

export const useLoadMore = <T>({ initialItems, totalPages, loadMoreAction }: TUseLoadMoreOptions<T>) => {
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<T[]>(initialItems);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const hasMore = page < totalPages;

  const loadPage = (pageToLoad: number) => {
    setIsError(false);

    startTransition(async () => {
      try {
        const newItems = await loadMoreAction(pageToLoad);

        setItems((prev) => [...prev, ...newItems]);
        setPage(pageToLoad);
      } catch (_error) {
        setIsError(true);
      }
    });
  };

  const handleLoadMore = () => {
    if (isPending || !hasMore) return;
    loadPage(page + 1);
  };

  const handleRetry = () => {
    loadPage(page + 1);
  };

  return {
    items,
    isPending,
    isError,
    hasMore,
    handleLoadMore,
    handleRetry,
  };
};
