import { useDebouncedSearchParamsUpdate } from '@/shared';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useFitnessLevelFilter = () => {
  const searchParams = useSearchParams();
  const [fitnessLevelValue, setFitnessLevelValue] = useState<string>(searchParams.get('fitnessLevel') ?? 'all');
  const updateSearchParams = useDebouncedSearchParamsUpdate('fitnessLevel');

  const handleChange = (value: string | null) => {
    const nextValue = value && value !== 'all' ? value : '';
    setFitnessLevelValue(value ?? 'all');
    updateSearchParams(nextValue);
  };

  return { fitnessLevelValue, handleChange };
};
