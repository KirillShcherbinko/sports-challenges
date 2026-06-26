import { useDebouncedSearchParamsUpdate } from '@/shared/hooks';
import { useSearchParams } from 'next/navigation';
import { useState, type ChangeEvent } from 'react';

export const useSearchFilter = () => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('search') ?? '');
  const updateSearch = useDebouncedSearchParamsUpdate('search');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setSearchValue(nextValue);
    updateSearch(nextValue);
  };

  return { searchValue, handleChange };
};
