import { CategoriesSelect } from '@/features/categories-select';
import { DifficultyTabs } from '@/features/difficulty-tabs';
import { SearchInput } from '@/features/search-input';
import { ChallengesList } from '@/widgets/challenges-list';
import { Group, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

type THomePageProps = {
  searchParams: Record<string, string | undefined>;
};

export const HomePage = async ({ searchParams }: THomePageProps) => {
  return (
    <Stack maw={1200} w="100%" py={32} px={48} gap={24}>
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
        <ChallengesList searchParams={searchParams} isPublished={true} />
      </Suspense>
    </Stack>
  );
};
