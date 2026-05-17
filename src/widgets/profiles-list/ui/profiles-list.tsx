import { ProfileCard, type TProfileFilters } from '@/entities/profile';
import { EActionStatus } from '@/shared';
import { fetchProfiles } from '../actions/fetch-profiles';
import { Button, Stack, Text } from '@mantine/core';

type TProfilesListProps = {
  searchParams: Promise<TProfileFilters>;
};

export const ProfilesList = async ({ searchParams }: TProfilesListProps) => {
  const resolvedParams = await searchParams;
  const { status, data, error } = await fetchProfiles(resolvedParams);

  if (status === EActionStatus.Error) {
    <Stack align="center">
      <Text c="var(--mantine-color-dark-2)">{error || 'Не удалось получить список профилей'}</Text>
      <Button onClick={() => fetchProfiles(resolvedParams)}>Повторить</Button>
    </Stack>;
  }

  if (status === EActionStatus.Success && !data?.items) {
    <Text c="var(--mantine-color-dark-2)">Список профилей пуст</Text>;
  }

  return (
    <Stack>
      data?.items &&
      {data?.items.map(({ id, username, fitnessLevel, avatarUrl }) => (
        <ProfileCard key={id} username={username} fitnessLevel={fitnessLevel} avatarUrl={avatarUrl} />
      ))}
    </Stack>
  );
};
