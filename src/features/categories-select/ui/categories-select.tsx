'use client';

import { MultiSelect } from '@mantine/core';
import { FITNESS_CATEGORY_DATA } from '@/shared';
import { useCategoriesFilter } from '../lib/use-categories-filter';

export const CategoriesSelect = () => {
  const { categoriesValue, handleChange } = useCategoriesFilter();

  return (
    <MultiSelect
      data={FITNESS_CATEGORY_DATA}
      value={categoriesValue}
      onChange={handleChange}
      placeholder="Выберите категории"
      searchable
      clearable
      hidePickedOptions
    />
  );
};
