import { Avatar, Card, Group, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';

type TChallengeCommentCardProps = {
  username: string;
  avatarUrl: string | null;
  content: string;
  createdAt: string;
  actionsSlot: ReactNode;
};

export const ChallengeCommentCard = ({
  username,
  avatarUrl,
  content,
  createdAt,
  actionsSlot,
}: TChallengeCommentCardProps) => {
  return (
    <Card p="md">
      <Group gap="sm" align="flex-start" wrap="nowrap">
        <Avatar src={avatarUrl} radius="50%" size={36} />
        <Stack gap={4}>
          <Group gap={8} align="center">
            <Text c="white" size="sm" fw={600}>
              {username}
            </Text>
            <Text c="var(--mantine-color-dark-2)" size="xs">
              {createdAt}
            </Text>
            {actionsSlot}
          </Group>
          <Text c="var(--mantine-color-dark-2)" size="sm">
            {content}
          </Text>
          {actionsSlot}
        </Stack>
      </Group>
    </Card>
  );
};
