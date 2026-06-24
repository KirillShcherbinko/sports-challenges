import { useDebouncedSearchParamsUpdate } from '@/shared';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useChallengeStatusFilter = () => {
  const searchParams = useSearchParams();
  const [statusValue, setStatusValue] = useState<string>(searchParams.get('status') ?? 'all');
  const updateSearchParams = useDebouncedSearchParamsUpdate('status');

  const handleChange = (value: string | null) => {
    const nextValue = value && value !== 'all' ? value : '';
    setStatusValue(value ?? 'all');
    updateSearchParams(nextValue);
  };

  return { statusValue, handleChange };
};
