import { getCommentsWithOwnershipAction } from '../actions/get-comments-with-ownership';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { ChallengeCommentsListClient } from './challenge-comments-list-client';

type TChallengeCommentsListProps = {
  challengeId: string;
};

export const ChallengeCommentsList = async ({ challengeId }: TChallengeCommentsListProps) => {
  const {
    data: initialData,
    serverError,
    validationErrors,
  } = await getCommentsWithOwnershipAction({ challengeId, page: 1 });

  if (serverError) {
    const retryFn = getCommentsWithOwnershipAction.bind(null, { challengeId, page: 1 });
    return <ErrorAlert errorMessage={serverError} retryFn={retryFn} />;
  }

  if (validationErrors) {
    const retryFn = getCommentsWithOwnershipAction.bind(null, { challengeId, page: 1 });
    return <ErrorAlert errorMessage="Неверные параметры" retryFn={retryFn} />;
  }

  if (!initialData || initialData.items.length === 0) {
    return <EmptyListAlert message="Комментарии не найдены" />;
  }

  return (
    <ChallengeCommentsListClient
      challengeId={challengeId}
      initialItems={initialData.items}
      totalPages={initialData.pagination.totalPages}
    />
  );
};
