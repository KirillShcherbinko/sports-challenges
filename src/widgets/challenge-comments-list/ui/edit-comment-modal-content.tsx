'use client';

import { Stack, Title } from '@mantine/core';
import { CommentForm } from '@/features/comment-form';

type TEditCommentModalContentProps = {
  commentId: string;
  content: string;
};

export const EditCommentModalContent = ({ commentId, content }: TEditCommentModalContentProps) => {
  return (
    <Stack gap="xl" w="100%" align="center">
      <Title ta="center" order={3}>Редактировать комментарий</Title>
      <CommentForm initialData={{ content }} commentId={commentId} />
    </Stack>
  );
};
