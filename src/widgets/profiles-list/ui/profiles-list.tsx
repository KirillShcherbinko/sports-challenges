import { ProfileCard, type TProfileFilters } from '@/entities/profile';
import { getProfilesAction } from '../actions/get-profiles';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { ProfilesListLayout } from './profiles-list-layout';
import { ListPagination } from '@/features/list-pagination';

type TProfilesListProps = {
  searchParams: TProfileFilters;
};

export const ProfilesList = async ({ searchParams }: TProfilesListProps) => {
  const { data: profiles, serverError, validationErrors } = await getProfilesAction(searchParams);

  if (serverError) {
    const retryFn = getProfilesAction.bind(null, searchParams);
    return <ErrorAlert errorMessage={`Ошибка ${serverError}`} retryFn={retryFn} />;
  }

  if (validationErrors) {
    const retryFn = getProfilesAction.bind(null, {});
    return <ErrorAlert errorMessage="Неверные параметры фильтрации" retryFn={retryFn} />;
  }

  if (!profiles) {
    return <EmptyListAlert message="Список профилей пуст" />;
  }

  return (
    <ProfilesListLayout>
      {profiles.items.map(({ id, username, fitnessLevel, avatarUrl }) => (
        <ProfileCard key={id} username={username} fitnessLevel={fitnessLevel} avatarUrl={avatarUrl} />
      ))}
      <ListPagination total={profiles.pagination.totalPages} totalPages={profiles.pagination.totalPages} />
    </ProfilesListLayout>
  );
};
