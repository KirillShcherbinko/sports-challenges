import { Avatar, Group, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';

type TChallengeCommentCardProps = {
  username: string;
  avatarUrl: string | null;
  content: string;
  createdAt: string;
  actionsSlot?: ReactNode;
};

export const ChallengeCommentCard = ({
  username,
  avatarUrl,
  content,
  createdAt,
  actionsSlot,
}: TChallengeCommentCardProps) => {
  return (
    <Stack
      p="md"
      gap="sm"
      bg="var(--mantine-color-dark-8)"
      style={{ borderRadius: 'var(--mantine-radius-md)', border: '1px solid var(--mantine-color-dark-6)' }}
    >
      <Group gap="sm" align="flex-start" wrap="nowrap">
        <Avatar src={avatarUrl} radius="xl" size={36} color="var(--mantine-color-brand-6)">
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Stack gap={4} style={{ flex: 1 }}>
          <Group gap={8} align="center" justify="space-between">
            <Group gap={8} align="center">
              <Text c="var(--mantine-color-dark-0)" size="sm" fw={600}>{username}</Text>
              <Text c="var(--mantine-color-dark-4)" size="xs" style={{ fontSize: 11 }}>{createdAt}</Text>
            </Group>
            {actionsSlot}
          </Group>
          <Text c="var(--mantine-color-dark-2)" size="sm">{content}</Text>
        </Stack>
      </Group>
    </Stack>
  );
};
