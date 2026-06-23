import type { FitnessCategory } from '@/shared/types';
import { Badge, Card, Group, Stack, Text } from '@mantine/core';

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
    <Card p="md">
      <Stack>
        <Group gap="sm" align="center">
          <Badge variant="default">Day {dayNumber}</Badge>
          <Badge variant="light">{exerciseType}</Badge>
        </Group>
        <Text component="h3" fw={600}>
          {title}
        </Text>
        <Text c="var(--mantine-color-dark-2)" size="sm">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};
