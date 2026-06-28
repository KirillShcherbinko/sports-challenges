'use client';

import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useTransition } from 'react';
import { likeAction } from '../actions/like';

type TLikeButtonProps = {
  challengeId: string;
  isLiked: boolean;
};

export const LikeButton = ({ challengeId, isLiked }: TLikeButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    startTransition(async () => {
      const { serverError } = await likeAction(challengeId);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }
    });
  };

  return (
    <ActionIcon
      size={24}
      variant="subtle"
      color={isLiked ? 'red' : 'gray'}
      loading={isPending}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    >
      {isLiked ? <IconHeartFilled size={16} /> : <IconHeart size={16} color="var(--mantine-color-dark-4)" />}
    </ActionIcon>
  );
};
