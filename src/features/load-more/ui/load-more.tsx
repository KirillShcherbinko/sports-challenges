'use client';

import { ErrorAlert } from '@/shared';
import { Button } from '@mantine/core';
import { useLoadMore } from '../lib/use-load-more';
import type { ReactNode } from 'react';

type TLoadMoreProps<T> = {
  initialItems: T[];
  totalPages: number;
  loadMoreAction: (nextPage: number) => Promise<T[]>;
  renderItem: (item: T, index: number) => ReactNode;
};

export const LoadMore = <T,>({ initialItems, totalPages, loadMoreAction, renderItem }: TLoadMoreProps<T>) => {
  const { items, isPending, isError, hasMore, handleLoadMore, handleRetry } = useLoadMore({
    initialItems,
    totalPages,
    loadMoreAction,
  });

  if (isError) {
    return <ErrorAlert errorMessage="Ошибка загрузки данных" retryFn={handleRetry} />;
  }

  return (
    <>
      {items.map((item, index) => renderItem(item, index))}

      {hasMore && (
        <Button variant="filled" onClick={handleLoadMore} loading={isPending} disabled={isPending}>
          Загрузить больше
        </Button>
      )}
    </>
  );
};
