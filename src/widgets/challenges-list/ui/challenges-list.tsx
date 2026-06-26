import { SimpleGrid, Stack } from '@mantine/core';
import { getChallengesAction } from '../actions/get-challenges';
import { ChallengeCard, type TChallengeFilters } from '@/entities/challenge';
import { LikeButton } from '@/features/like-button';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { ListPagination } from '@/features/list-pagination';

type TChallengesListProps = {
  searchParams: TChallengeFilters;
  creatorName?: string;
  isPublished?: boolean;
  personalize?: boolean;
};

export const ChallengesList = async ({ searchParams, creatorName, isPublished, personalize }: TChallengesListProps) => {
  const {
    data: challenges,
    serverError,
    validationErrors,
  } = await getChallengesAction({ ...searchParams, creatorName, isPublished, personalize });

  if (serverError) {
    return (
      <ErrorAlert
        errorMessage={serverError}
        retryFn={async () => await getChallengesAction({ ...searchParams, creatorName, isPublished, personalize })}
      />
    );
  }

  if (validationErrors) {
    return (
      <ErrorAlert
        errorMessage="Неверные параметры фильтрации"
        retryFn={async () => await getChallengesAction({ creatorName, isPublished, personalize })}
      />
    );
  }

  if (!challenges || challenges.pagination.total === 0) {
    return <EmptyListAlert message="Челлленджи не найдены" />;
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
        {challenges.items.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
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
