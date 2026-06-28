'use client';

import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useSearchFilter } from '../lib/use-search-filter';

type SearchInputProps = {
  placeholder?: string;
};

export const SearchInput = ({ placeholder = 'Поиск профилей' }: SearchInputProps) => {
  const { searchValue, handleChange } = useSearchFilter();

  return (
    <TextInput
      maw={552}
      w="100%"
      value={searchValue}
      onChange={handleChange}
      placeholder={placeholder}
      leftSection={<IconSearch size={20} color="var(--mantine-color-dark-4)" />}
      styles={{
        input: {
          backgroundColor: 'var(--mantine-color-dark-8)',
          border: '1px solid var(--mantine-color-dark-6)',
        },
      }}
    />
  );
};
