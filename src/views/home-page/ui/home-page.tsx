import { CategoriesSelect } from '@/features/categories-select';
import { DifficultyTabs } from '@/features/difficulty-tabs';
import { SearchInput } from '@/features/search-input';
import { ChallengesList } from '@/widgets/challenges-list';
import { Group, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';
import type { TChallengeFilters } from '@/entities/challenge';

type THomePageProps = {
  searchParams: TChallengeFilters;
};

export const HomePage = async ({ searchParams }: THomePageProps) => {
  return (
    <Stack maw={1200} w="100%" p={24} gap={24}>
      <Text fw={700} fz={28}>
        Открыть челленджи
      </Text>

      <Stack gap={12}>
        <DifficultyTabs />
        <Group w="100%" justify="between" align="end" wrap="nowrap">
          <SearchInput placeholder="Поиск челленджей" />
          <CategoriesSelect />
        </Group>
      </Stack>

      <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
        <ChallengesList searchParams={searchParams} />
      </Suspense>
    </Stack>
  );
};
