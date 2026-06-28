'use client';

import { ActionIcon } from '@mantine/core';
import { deleteCommentAction } from '../actions/delete-comment';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import { IconTrashFilled } from '@tabler/icons-react';

type TDeleteCommentButtonProps = {
  commentId: string;
};

export const DeleteCommentButton = ({ commentId }: TDeleteCommentButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleCommentDeletion = async () => {
    startTransition(async () => {
      const { data: isCommentDeleted, serverError } = await deleteCommentAction(commentId);

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
      variant="subtle"
      c="red"
      onClick={handleCommentDeletion}
      loading={isPending}
      aria-label="Удалить комментарий"
    >
      <IconTrashFilled />
    </ActionIcon>
  );
};
