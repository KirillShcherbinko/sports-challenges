import { Card, Group, Image, Progress, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';

type TProfileChallengeCardProps = {
  title: string;
  coverImageUrl: string | null;
  currentDay: number;
  durationDays: number;
  percentage: number;
  statusBadgeSlot: ReactNode;
  actionsSlot: ReactNode;
};

export const ProfileChallengeCard = ({
  title,
  coverImageUrl,
  currentDay,
  durationDays,
  percentage,
  statusBadgeSlot,
  actionsSlot,
}: TProfileChallengeCardProps) => {
  return (
    <Card p="md">
      {coverImageUrl && <Image src={coverImageUrl} alt={title} />}
      <Stack>
        <Group gap="sm" align="center">
          <Text component="h3" fw={600}>
            {title}
          </Text>
          {statusBadgeSlot}
        </Group>
        <Progress value={percentage} size="sm" />
        <Group justify="space-between">
          <Text c="var(--mantine-color-dark-2)" size="sm">
            {currentDay}/{durationDays} дней
          </Text>
          <Text c="var(--mantine-color-dark-2)" size="sm" fw={600}>
            {percentage}%
          </Text>
        </Group>
        {actionsSlot}
      </Stack>
    </Card>
  );
};
