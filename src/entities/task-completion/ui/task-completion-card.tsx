import { Group, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';

type TTaskCompletionCardProps = {
  isCompleted: boolean;
  completedAt: string | null;
  title: string;
  dayNumber: number;
  actionsSlot?: ReactNode;
};

export const TaskCompletionCard = ({
  isCompleted,
  completedAt,
  title,
  dayNumber,
  actionsSlot,
}: TTaskCompletionCardProps) => {
  return (
    <Group
      gap="sm"
      wrap="nowrap"
      align="center"
      p="sm"
      bg="var(--mantine-color-dark-8)"
      style={{ borderRadius: 'var(--mantine-radius-sm)', border: '1px solid var(--mantine-color-dark-6)' }}
    >
      <Stack gap={2} style={{ flex: 1 }}>
        <Text c="var(--mantine-color-dark-0)" size="sm" fw={600}>
          День {dayNumber} — {isCompleted ? 'Выполнено' : 'Пропущено'}
        </Text>
        <Text c="var(--mantine-color-dark-4)" size="xs">{title}</Text>
        {completedAt && <Text c="var(--mantine-color-dark-4)" size="xs">{completedAt}</Text>}
      </Stack>
      {actionsSlot}
    </Group>
  );
};
