import { SimpleGrid } from '@mantine/core';
import { getChallengesAction } from '../actions/get-challenges';
import { ChallengeCard, type TChallengeFilters } from '@/entities/challenge';
import { LikeButton } from '@/features/like-button';
import { EmptyListAlert, ErrorAlert } from '@/shared';

type TChallengesListProps = {
  searchParams: TChallengeFilters;
};

export const ChallengesList = async ({ searchParams }: TChallengesListProps) => {
  const { data: challenges, serverError } = await getChallengesAction(searchParams);

  if (serverError) {
    return <ErrorAlert errorMessage={serverError} retryFn={async () => await getChallengesAction(searchParams)} />;
  }

  if (!challenges || challenges.pagination.total === 0) {
    return <EmptyListAlert message="Челлленджи не найдены" />;
  }

  return (
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
  );
};
