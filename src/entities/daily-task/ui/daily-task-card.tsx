import type { FitnessCategory } from '@/shared/types';
import { Badge, Group, Stack, Text } from '@mantine/core';

type TDailyTaskCardProps = {
  title: string;
  description: string;
  exerciseType: FitnessCategory;
  dayNumber: number;
};

export const DailyTaskCard = ({
  title,
  description,
  exerciseType,
  dayNumber,
}: TDailyTaskCardProps) => {
  return (
    <Stack
      p="md"
      gap={8}
      bg="var(--mantine-color-dark-8)"
      style={{ borderRadius: 'var(--mantine-radius-md)', border: '1px solid var(--mantine-color-dark-6)' }}
    >
      <Group gap={8} align="center">
        <Badge color="var(--mantine-color-dark-6)" radius="xl" size="sm" variant="filled">Day {dayNumber}</Badge>
        <Badge color="var(--mantine-color-brand-6)" radius="xl" size="sm" variant="filled">{exerciseType}</Badge>
      </Group>
      <Text fw={600} fz="md" c="var(--mantine-color-dark-0)">{title}</Text>
      <Text c="var(--mantine-color-dark-4)" size="sm">{description}</Text>
    </Stack>
  );
};
