import { ProfileCard, type TProfileFilters } from '@/entities/profile';
import { Button, Stack, Text } from '@mantine/core';
import { ProfilesPagination } from '@/features/profiles-pagination';
import { getProfilesAction } from '../actions/get-profiles';

type TProfilesListProps = {
  searchParams: TProfileFilters;
};

export const ProfilesList = async ({ searchParams }: TProfilesListProps) => {
  const { data, serverError, validationErrors } = await getProfilesAction(searchParams);

  if (serverError) {
    return (
      <Stack align="center">
        <Text c="var(--mantine-color-dark-2)">{`Ошибка ${serverError}`}</Text>
        <Button onClick={async () => await getProfilesAction(searchParams)}>Повторить</Button>
      </Stack>
    );
  }

  if (validationErrors) {
    return (
      <Stack align="center">
        <Text c="var(--mantine-color-dark-2)">Неверные параметры фильтрации</Text>
        <Button onClick={async () => await getProfilesAction({})}>Перезагрузить</Button>
      </Stack>
    );
  }

  if (!data) {
    return <Text c="var(--mantine-color-dark-2)">Список профилей пуст</Text>;
  }

  return (
    <Stack maw={800} w="100%" align="center" gap={12}>
      {data?.items.map(({ id, username, fitnessLevel, avatarUrl }) => (
        <ProfileCard key={id} username={username} fitnessLevel={fitnessLevel} avatarUrl={avatarUrl} />
      ))}
      <ProfilesPagination total={data.pagination.totalPages || 1} />
    </Stack>
  );
};
