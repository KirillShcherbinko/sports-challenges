'use client';

import { ActionIcon } from '@mantine/core';
import { useParams } from 'next/navigation';
import { deleteCommentAction } from '../actions/delete-comment';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import { IconTrashFilled } from '@tabler/icons-react';

export const DeleteCommentButton = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [isPending, startTransition] = useTransition();

  const handleCommentDeletion = async () => {
    startTransition(async () => {
      const { data: isCommentDeleted, serverError } = await deleteCommentAction(challengeId);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }

      if (isCommentDeleted) {
        notifications.show({
          title: 'Успех',
          message: 'Комментарий к челленджу успешно удалён',
          color: 'green',
        });
      }
    });
  };

  return (
    <ActionIcon
      variant="filled"
      c="red"
      onClick={handleCommentDeletion}
      loading={isPending}
      aria-label="Удалить комментарий"
    >
      <IconTrashFilled />
    </ActionIcon>
  );
};
