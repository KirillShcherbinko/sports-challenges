import { Group, Text } from '@mantine/core';
import { getLikeDataAction } from '../actions/get-like-data';
import { notifications } from '@mantine/notifications';
import { LikeButton } from './like-button';

type TLikeCounterProps = {
  challengeId: string;
};

export const LikeCounter = async ({ challengeId }: TLikeCounterProps) => {
  const { data: likeData, serverError } = await getLikeDataAction(challengeId);

  if (serverError) {
    notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
  }

  return (
    <Group gap="sm">
      <LikeButton challengeId={challengeId} isLiked={likeData?.isLiked ?? false} />
      <Text c="var(--mantine-var-dark-2)">{likeData?.likesCount ?? 0}</Text>
    </Group>
  );
};
