import { Avatar, Badge, Group, Stack, Text } from '@mantine/core';
import type { FitnessLevel } from '@/shared/types';
import { FITNESS_LEVEL_LABELS } from '@/shared';

type TUserCardProps = {
  username: string;
  fitnessLevel: FitnessLevel;
  avatarUrl: string | null;
};

export const ProfileCard = ({ username, avatarUrl, fitnessLevel }: TUserCardProps) => {
  return (
    <Group gap={12} wrap="nowrap" maw={800} w="100%">
      <Avatar src={avatarUrl} radius="xl" size={64} color="var(--mantine-color-brand-6)">
        {username.charAt(0).toUpperCase()}
      </Avatar>
      <Stack gap={4}>
        <Text fw={700} fz="lg" c="var(--mantine-color-dark-0)">{username}</Text>
        <Badge color="var(--mantine-color-brand-6)" radius="xl" variant="filled" size="sm">{FITNESS_LEVEL_LABELS[fitnessLevel]}</Badge>
      </Stack>
    </Group>
  );
};
