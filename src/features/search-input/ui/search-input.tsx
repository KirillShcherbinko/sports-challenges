'use client';

import { TextInput } from '@mantine/core';
import { IconSearchFilled } from '@tabler/icons-react';
import { useSearchFilter } from '../lib/use-search-filter';

export const SearchInput = () => {
  const { searchValue, handleChange } = useSearchFilter();

  return (
    <TextInput
      maw={552}
      w="100%"
      value={searchValue}
      onChange={handleChange}
      placeholder="Поиск профилей"
      leftSection={<IconSearchFilled size={24} />}
    />
  );
};
