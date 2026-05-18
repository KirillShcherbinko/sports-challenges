import { Avatar, Badge, Group, Stack, Title } from '@mantine/core';
import { FITNESS_LEVEL_COLORS } from '../config/fitness-level-colors';
import type { FitnessLevel } from '@/shared/types';

type TUserCardProps = {
  username: string;
  fitnessLevel: FitnessLevel;
  avatarUrl: string | null;
};

export const ProfileCard = ({ username, avatarUrl, fitnessLevel }: TUserCardProps) => {
  return (
    <Group gap={12} wrap="nowrap" maw={800} w="100%">
      <Avatar src={avatarUrl} radius="50%" size={64} />
      <Stack gap={8}>
        <Title component="h3" order={3} lineClamp={1}>
          {username}
        </Title>
        <Badge c={FITNESS_LEVEL_COLORS[fitnessLevel]}>{fitnessLevel}</Badge>
      </Stack>
    </Group>
  );
};
