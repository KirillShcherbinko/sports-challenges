import { useDebouncedSearchParamsUpdate } from '@/shared/hooks';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useDifficultyFilter = () => {
  const searchParams = useSearchParams();
  const [difficultyValue, setDifficultyValue] = useState<string>(searchParams.get('difficulty') ?? 'all');
  const updateSearchParams = useDebouncedSearchParamsUpdate('difficulty');

  const handleChange = (value: string | null) => {
    const nextValue = value && value !== 'all' ? value : '';
    setDifficultyValue(value ?? 'all');
    updateSearchParams(nextValue);
  };

  return { difficultyValue, handleChange };
};
