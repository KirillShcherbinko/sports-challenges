import type { TProfileFilters } from '@/entities/profile';
import { FitnessLevelTabs } from '@/features/fitness-level-tabs';
import { SearchInput } from '@/features/search-input';
import { ProfilesList } from '@/widgets/profiles-list';
import { Center, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

type TCreatorsPageProps = {
  searchParams: TProfileFilters;
};

export const CreatorsPage = async ({ searchParams }: TCreatorsPageProps) => {
  return (
    <Stack w="100%" py={32} px={48} gap={20}>
      <Text fw={700} fz={28}>
        Креаторы
      </Text>
      <Stack gap={12}>
        <FitnessLevelTabs />
        <SearchInput placeholder="Поиск креаторов" />
      </Stack>

      <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
        <ProfilesList searchParams={searchParams} />
      </Suspense>
    </Stack>
  );
};
