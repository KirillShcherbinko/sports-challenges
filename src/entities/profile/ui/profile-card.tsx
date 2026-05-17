import type { FitnessLevel } from '@/shared/generated/prisma/enums';
import { Avatar, Group, Pill, Stack, Title } from '@mantine/core';

type TUserCardProps = {
  username: string;
  fitnessLevel: FitnessLevel;
  avatarUrl: string | null;
};

export const ProfileCard = ({ username, avatarUrl, fitnessLevel }: TUserCardProps) => {
  return (
    <Group gap={12} wrap="nowrap">
      <Avatar src={avatarUrl} radius="50%" size={64} />
      <Stack gap={8}>
        <Title component="h3" order={3} lineClamp={1}>
          {username}
        </Title>
        <Pill>{fitnessLevel}</Pill>
      </Stack>
    </Group>
  );
};
