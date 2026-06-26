import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const usePaginationFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageValue = Number(searchParams.get('page') ?? 1);

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { pageValue, handleChange };
};
