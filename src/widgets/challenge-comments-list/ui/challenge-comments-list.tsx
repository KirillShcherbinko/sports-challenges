import { Stack } from '@mantine/core';
import { ChallengeCommentCard, type TChallengeCommentDto } from '@/entities/challenge-comment';
import { getChallengeCommentsAction } from '../actions/get-challenge-comments';
import { LoadMore } from '@/features/load-more';
import { EmptyListAlert, ErrorAlert } from '@/shared';

type TChallengeCommentsListProps = {
  challengeId: string;
};

export const ChallengeCommentsList = async ({ challengeId }: TChallengeCommentsListProps) => {
  const {
    data: initialData,
    serverError,
    validationErrors,
  } = await getChallengeCommentsAction({ challengeId, page: 1 });

  if (serverError) {
    return (
      <ErrorAlert
        errorMessage={serverError}
        retryFn={async () => await getChallengeCommentsAction({ challengeId, page: 1 })}
      />
    );
  }

  if (validationErrors) {
    return (
      <ErrorAlert
        errorMessage="Неверные параметры"
        retryFn={async () => await getChallengeCommentsAction({ challengeId, page: 1 })}
      />
    );
  }

  if (!initialData || initialData.items.length === 0) {
    return <EmptyListAlert message="Комментарии не найдены" />;
  }

  const loadMoreAction = async (nextPage: number) => {
    const result = await getChallengeCommentsAction({ challengeId, page: nextPage });
    return result?.data?.items ?? [];
  };

  return (
    <Stack>
      <LoadMore<TChallengeCommentDto>
        initialItems={initialData.items}
        totalPages={initialData.pagination.totalPages}
        loadMoreAction={loadMoreAction}
        renderItem={(comment) => (
          <ChallengeCommentCard
            key={comment.id}
            username={comment.profile.username}
            avatarUrl={comment.profile.avatarUrl}
            content={comment.content}
            createdAt={comment.createdAt.toISOString()}
            actionsSlot={<></>}
          />
        )}
      />
    </Stack>
  );
};
