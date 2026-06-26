import type { TProfileFilters } from '@/entities/profile';
import { FitnessLevelTabs } from '@/features/fitness-level-tabs';
import { ProfilesLimitSelect } from '@/features/profiles-limit-select';
import { SearchInput } from '@/features/search-input';
import { ProfilesList } from '@/widgets/profiles-list';
import { Group, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

type TCreatorsPageProps = {
  searchParams: TProfileFilters;
};

export const CreatorsPage = async ({ searchParams }: TCreatorsPageProps) => {
  return (
    <Stack maw={800} w="100%" p={24} gap={16}>
      <Text fw={700} fz={28}>
        Креаторы
      </Text>
      <Stack gap={12}>
        <FitnessLevelTabs />
        <Group w="100%" justify="between" align="end" wrap="nowrap">
          <SearchInput placeholder="Поиск креаторов" />
          <ProfilesLimitSelect />
        </Group>
      </Stack>

      <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
        <ProfilesList searchParams={searchParams} />
      </Suspense>
    </Stack>
  );
};
