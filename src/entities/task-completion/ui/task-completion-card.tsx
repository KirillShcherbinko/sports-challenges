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
}: TTaskCompletionCardProps) => {
  return (
    <Group gap="sm" wrap="nowrap" align="flex-start">
      <Stack>
        <Text c="white" size="sm" fw={600}>
          Day {dayNumber} — {isCompleted ? 'Выполнено' : 'Пропушено'}
        </Text>
        <Text c="var(--mantine-color-dark-2)" size="xs">
          {title}
        </Text>
        {completedAt && (
          <Text c="var(--mantine-color-dark-2)" size="xs">
            {completedAt}
          </Text>
        )}
      </Stack>
    </Group>
  );
};
