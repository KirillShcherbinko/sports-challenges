import { Badge, Group, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import type { TDailyTaskDto } from '../model/dtos';

type TDailyTaskBadgeProps = TDailyTaskDto & {
  actionSlot?: ReactNode;
};

export const DailyTaskBadge = ({ title, description, exerciseType, dayNumber, actionSlot }: TDailyTaskBadgeProps) => {
  return (
    <Group
      justify="space-between"
      align="flex-start"
      p="md"
      bg="var(--mantine-color-dark-8)"
      style={{ borderRadius: 'var(--mantine-radius-md)', border: '1px solid var(--mantine-color-dark-6)' }}
    >
      <Stack gap={8}>
        <Group gap={8}>
          <Badge color="var(--mantine-color-dark-6)" radius="xl" variant="filled">День {dayNumber}</Badge>
          <Badge color="var(--mantine-color-brand-6)" radius="xl" variant="filled">{exerciseType}</Badge>
        </Group>
        <Text fw={600} c="var(--mantine-color-dark-0)">{title}</Text>
        <Text c="var(--mantine-color-dark-4)" size="sm">
          {description}
        </Text>
      </Stack>
      {actionSlot}
    </Group>
  );
};
