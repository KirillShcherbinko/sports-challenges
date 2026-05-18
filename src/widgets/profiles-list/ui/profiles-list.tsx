import { ProfileCard, type TProfileFilters } from '@/entities/profile';
import { EActionStatus } from '@/shared';
import { fetchProfiles } from '../actions/fetch-profiles';
import { Button, Stack, Text } from '@mantine/core';
import { ProfilesPagination } from '@/features/profiles-pagination';

type TProfilesListProps = {
  searchParams: TProfileFilters;
};

export const ProfilesList = async ({ searchParams }: TProfilesListProps) => {
  const { status, data, error } = await fetchProfiles(searchParams);

  if (status === EActionStatus.Error) {
    return (
      <Stack align="center">
        <Text c="var(--mantine-color-dark-2)">{error || 'Не удалось получить список профилей'}</Text>
        <Button>Повторить</Button>
      </Stack>
    );
  }

  if (status === EActionStatus.Success && data?.items.length === 0) {
    return <Text c="var(--mantine-color-dark-2)">Список профилей пуст</Text>;
  }

  return (
    <Stack maw={800} w="100%" align="center" gap={12}>
      {data?.items.map(({ id, username, fitnessLevel, avatarUrl }) => (
        <ProfileCard key={id} username={username} fitnessLevel={fitnessLevel} avatarUrl={avatarUrl} />
      ))}
      <ProfilesPagination total={data?.pagination.total || 20} />
    </Stack>
  );
};
