import { Card, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconCalendarCheck, IconCalendarX, IconFlame, IconPercentage } from '@tabler/icons-react';
import { getMyChallengeProgressAction } from '../actions';

type TChallengeProgressStatsProps = {
  challengeId: string;
};

export const ChallengeProgressStats = async ({ challengeId }: TChallengeProgressStatsProps) => {
  const { data, serverError } = await getMyChallengeProgressAction({ challengeId });

  if (serverError || !data) {
    return null;
  }

  const stats = [
    { icon: IconCalendarCheck, label: 'Дней завершено', value: data.daysCompleted, color: '#10b981', iconColor: '#10b981' },
    { icon: IconCalendarX, label: 'Дней пропущено', value: data.daysMissed, color: '#ef4444', iconColor: '#ef4444' },
    { icon: IconFlame, label: 'Текущая серия', value: data.currentStreak, color: '#f59e0b', iconColor: '#f59e0b' },
    { icon: IconPercentage, label: 'Процент выполнения', value: `${data.completionPercentage}%`, color: '#818cf8', iconColor: '#818cf8' },
  ] as const;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
      {stats.map(({ icon: Icon, label, value, color, iconColor }) => (
        <Card key={label} radius="lg" bg="#1a202c" padding="lg">
          <Group gap="sm">
            <Icon size={28} color={iconColor} />
            <Stack gap={0}>
              <Text fw={700} fz="xl" c={color}>
                {value}
              </Text>
              <Text size="sm" c="#94a3b8">
                {label}
              </Text>
            </Stack>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};
