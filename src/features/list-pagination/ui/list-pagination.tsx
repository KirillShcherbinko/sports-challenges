'use client';

import { Pagination } from '@mantine/core';
import { usePaginationFilter } from '../lib/use-pagination-filter';

type TProfilesPaginationProps = {
  total: number;
  totalPages: number;
};

export const ListPagination = ({ total, totalPages }: TProfilesPaginationProps) => {
  const { pageValue, handleChange } = usePaginationFilter();

  return totalPages === 1 && <Pagination value={pageValue} onChange={handleChange} total={total} />;
};
