'use client';

import { TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useState, type ChangeEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SearchProfilesInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get('search') ?? '');

  const updateSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    updateSearch(nextValue);
  };

  return <TextInput maw={552} w="100%" value={value} onChange={handleChange} placeholder="Поиск профилей" />;
};
