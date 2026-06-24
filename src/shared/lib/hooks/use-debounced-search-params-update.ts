import { useDebouncedCallback } from '@mantine/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_DELAY = 500;

export const useDebouncedSearchParamsUpdate = (
  searchParamName: string,
  delay: number = DEFAULT_DELAY
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useDebouncedCallback((searchParam) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchParam) {
      params.set(searchParamName, searchParam);
    } else {
      params.delete(searchParamName);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, delay);
};
