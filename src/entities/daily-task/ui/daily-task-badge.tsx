import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import type { TDailyTaskDto } from '../model/dtos';

type TDailyTaskBadgeProps = TDailyTaskDto & {
  actionSlot?: ReactNode;
};

export const DailyTaskBadge = ({ title, description, exerciseType, dayNumber, actionSlot }: TDailyTaskBadgeProps) => {
  return (
    <Card p="md">
      <Group justify="space-between" align="flex-start">
        <Stack gap="xs">
          <Group gap="sm">
            <Badge variant="default">День {dayNumber}</Badge>
            <Badge variant="light">{exerciseType}</Badge>
          </Group>
          <Text fw={600}>{title}</Text>
          <Text c="var(--mantine-color-dark-2)" size="sm">
            {description}
          </Text>
        </Stack>
        {actionSlot}
      </Group>
    </Card>
  );
};
