'use client';

import { TextInput } from '@mantine/core';
import { IconSearchFilled } from '@tabler/icons-react';
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
      leftSection={<IconSearchFilled size={24} />}
    />
  );
};
