import { useDebouncedSearchParamsUpdate } from '@/shared';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useCategoriesFilter = () => {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get('category') ?? '';
  const [categoriesValue, setCategoriesValue] = useState<string[]>(paramValue ? paramValue.split(',') : []);
  const updateSearchParams = useDebouncedSearchParamsUpdate('category');

  const handleChange = (value: string[]) => {
    setCategoriesValue(value);
    const nextValue = value.length > 0 ? value.join(',') : '';
    updateSearchParams(nextValue);
  };

  return { categoriesValue, handleChange };
};
