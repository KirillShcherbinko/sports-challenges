import { Badge, SimpleGrid, Stack } from '@mantine/core';
import { getProfileChallengesAction } from '../actions/get-profile-challenges';
import { EmptyListAlert, ErrorAlert, PROFILE_CHALLENGE_STATUS_LABELS } from '@/shared';
import { ListPagination } from '@/features/list-pagination';
import { ProfileChallengeCard } from '@/entities/profile-challenge/ui/profile-challenge-card';
import type { TProfileChallengesFilters } from '@/entities/profile-challenge/model/types';

type TProfileChallengesListProps = {
  creatorName: string;
  searchParams: TProfileChallengesFilters;
};

export const ProfileChallengesList = async ({ creatorName, searchParams }: TProfileChallengesListProps) => {
  const {
    data: profileChallenges,
    serverError,
    validationErrors,
  } = await getProfileChallengesAction({ creatorName, ...searchParams });

  if (serverError) {
    const retryFn = getProfileChallengesAction.bind(null, { creatorName });
    return <ErrorAlert errorMessage={serverError} retryFn={retryFn} />;
  }

  if (validationErrors) {
    const retryFn = getProfileChallengesAction.bind(null, { creatorName });
    return <ErrorAlert errorMessage="Неверные параметры фильтрации" retryFn={retryFn} />;
  }

  if (!profileChallenges || profileChallenges.pagination.total === 0) {
    return <EmptyListAlert message="Челленджи не найдены" />;
  }

  return (
    <Stack>
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          lg: 3,
        }}
      >
        {profileChallenges.items.map((item) => (
          <ProfileChallengeCard
            key={item.challengeId}
            challengeId={item.challengeId}
            title={item.challenge.title}
            coverImageUrl={item.challenge.coverImageUrl}
            currentDay={item.currentDay}
            durationDays={item.challenge.durationDays}
            percentage={item.percentage}
            statusBadgeSlot={<Badge variant="light">{PROFILE_CHALLENGE_STATUS_LABELS[item.status]}</Badge>}
            actionsSlot={null}
          />
        ))}
      </SimpleGrid>
      <ListPagination
        total={profileChallenges.pagination.totalPages}
        totalPages={profileChallenges.pagination.totalPages}
      />
    </Stack>
  );
};
