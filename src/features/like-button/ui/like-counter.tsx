import { Group, Text } from '@mantine/core';
import { getLikeDataAction } from '../actions/get-like-data';
import { LikeButton } from './like-button';

type TLikeCounterProps = {
  challengeId: string;
};

export const LikeCounter = async ({ challengeId }: TLikeCounterProps) => {
  const { data: likeData } = await getLikeDataAction(challengeId);

  return (
    <Group gap={4}>
      <LikeButton challengeId={challengeId} isLiked={likeData?.isLiked ?? false} />
      <Text c="var(--mantine-color-dark-4)" size="xs">{likeData?.likesCount ?? 0}</Text>
    </Group>
  );
};
