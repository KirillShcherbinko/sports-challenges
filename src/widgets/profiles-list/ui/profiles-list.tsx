import { ProfileCard, type TProfileFilters } from '@/entities/profile';
import { ProfilesPagination } from '@/features/profiles-pagination';
import { getProfilesAction } from '../actions/get-profiles';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { ProfilesListLayout } from './profiles-list-layout';

type TProfilesListProps = {
  searchParams: TProfileFilters;
};

export const ProfilesList = async ({ searchParams }: TProfilesListProps) => {
  const { data, serverError, validationErrors } = await getProfilesAction(searchParams);

  if (serverError) {
    return (
      <ErrorAlert errorMessage={`Ошибка ${serverError}`} retryFn={async () => await getProfilesAction(searchParams)} />
    );
  }

  if (validationErrors) {
    return (
      <ErrorAlert errorMessage="Неверные параметры фильтрации" retryFn={async () => await getProfilesAction({})} />
    );
  }

  if (!data) {
    return <EmptyListAlert message="Список профилей пуст" />;
  }

  return (
    <ProfilesListLayout>
      {data.items.map(({ id, username, fitnessLevel, avatarUrl }) => (
        <ProfileCard key={id} username={username} fitnessLevel={fitnessLevel} avatarUrl={avatarUrl} />
      ))}
      <ProfilesPagination total={data.pagination.totalPages} />
    </ProfilesListLayout>
  );
};
