import type { TProfileFilters } from '@/entities/profile';
import { FitnessLevelTabs } from '@/features/fitness-level-tabs';
import { ProfilesLimitSelect } from '@/features/profiles-limit-select';
import { SearchProfilesInput } from '@/features/search-profiles-input';
import { ProfilesList } from '@/widgets/profiles-list';
import { Group, Loader, Stack } from '@mantine/core';
import { Suspense } from 'react';

type TDiscoverCreatorsPageProps = {
  searchParams: TProfileFilters;
};

export const DiscoverCreatorsPage = async ({ searchParams }: TDiscoverCreatorsPageProps) => {
  return (
    <Stack maw={800} w="100%" p={24} gap={16}>
      <Stack gap={12}>
        <FitnessLevelTabs />
        <Group w="100%" justify="between" align="end" wrap="nowrap">
          <SearchProfilesInput />
          <ProfilesLimitSelect />
        </Group>
      </Stack>

      <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
        <ProfilesList searchParams={searchParams} />
      </Suspense>
    </Stack>
  );
};
