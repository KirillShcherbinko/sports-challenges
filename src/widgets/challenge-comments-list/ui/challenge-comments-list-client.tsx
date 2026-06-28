'use client';

import { Group, Stack } from '@mantine/core';
import { ChallengeCommentCard, type TChallengeCommentDto } from '@/entities/challenge-comment';
import { getCommentsWithOwnershipAction } from '../actions/get-comments-with-ownership';
import { LoadMore } from '@/features/load-more';
import { OpenEditModal } from '@/features/open-edit-modal';
import { DeleteCommentButton } from '@/features/delete-comment-button';
import { EditCommentModalContent } from './edit-comment-modal-content';

type TChallengeCommentsListClientProps = {
  challengeId: string;
  initialItems: TChallengeCommentDto[];
  totalPages: number;
};

export const ChallengeCommentsListClient = ({
  challengeId,
  initialItems,
  totalPages,
}: TChallengeCommentsListClientProps) => {
  return (
    <Stack>
      <LoadMore<TChallengeCommentDto>
        initialItems={initialItems}
        totalPages={totalPages}
        loadMoreAction={async (nextPage: number) => {
          const result = await getCommentsWithOwnershipAction({ challengeId, page: nextPage });
          return result?.data?.items ?? [];
        }}
        renderItem={(comment) => (
          <ChallengeCommentCard
            key={comment.id}
            username={comment.profile.username}
            avatarUrl={comment.profile.avatarUrl}
            content={comment.content}
            createdAt={comment.createdAt.toISOString()}
            actionsSlot={
              comment.isOwnedByUser ? (
                <Group gap="xs">
                  <OpenEditModal
                    modalContent={() => (
                      <EditCommentModalContent commentId={comment.id} content={comment.content} />
                    )}
                  />
                  <DeleteCommentButton commentId={comment.id} />
                </Group>
              ) : null
            }
          />
        )}
      />
    </Stack>
  );
};
