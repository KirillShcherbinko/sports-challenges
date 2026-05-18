'use client';

import { Pagination } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type TProfilesPaginationProps = {
  total: number;
};

export const ProfilesPagination = ({ total }: TProfilesPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') ?? 1);

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));

    router.replace(`${pathname}?${params.toString()}`);
  };

  return <Pagination value={currentPage} onChange={handleChange} total={total} />;
};
