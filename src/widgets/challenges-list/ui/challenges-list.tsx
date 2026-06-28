import { SimpleGrid, Stack } from '@mantine/core';
import { getChallengesAction } from '../actions/get-challenges';
import { ChallengeCard } from '@/entities/challenge';
import { ERoutes } from '@/shared';
import { LikeButton } from '@/features/like-button';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { ListPagination } from '@/features/list-pagination';

type TChallengesListProps = {
  searchParams: Record<string, string | undefined>;
  creatorName?: string;
  useCurrentUser?: boolean;
  isPublished?: boolean;
  personalize?: boolean;
  route?: string;
};

export const ChallengesList = async ({
  searchParams,
  creatorName,
  useCurrentUser,
  isPublished,
  personalize,
  route,
}: TChallengesListProps) => {
  const {
    data: challenges,
    serverError,
    validationErrors,
  } = await getChallengesAction({ ...searchParams, creatorName, useCurrentUser, isPublished, personalize });

  if (serverError) {
    const retryFn = getChallengesAction.bind(null, { ...searchParams, creatorName, useCurrentUser, isPublished, personalize });
    return <ErrorAlert errorMessage={serverError} retryFn={retryFn} />;
  }

  if (validationErrors) {
    const retryFn = getChallengesAction.bind(null, { ...searchParams, creatorName, useCurrentUser, isPublished, personalize });
    return <ErrorAlert errorMessage="Неверные параметры фильтрации" retryFn={retryFn} />;
  }

  if (!challenges || challenges.pagination.total === 0) {
    return <EmptyListAlert message="Челленджи не найдены" />;
  }

  const resolvedRoute = route ?? ERoutes.CHALLENGES;

  return (
    <Stack>
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          lg: 3,
        }}
      >
        {challenges.items.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            id={challenge.id}
            route={resolvedRoute}
            title={challenge.title}
            description={challenge.description}
            coverImageUrl={challenge.coverImageUrl}
            difficulty={challenge.difficulty}
            category={challenge.categories[0]}
            participantsCount={challenge.participantsCount}
            likesCountSlot={<LikeButton challengeId={challenge.id} />}
          />
        ))}
      </SimpleGrid>
      <ListPagination total={challenges.pagination.totalPages} totalPages={challenges.pagination.totalPages} />
    </Stack>
  );
};
