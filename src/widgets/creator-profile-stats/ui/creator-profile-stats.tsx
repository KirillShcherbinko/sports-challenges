import { Card, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconPercentage, IconStars, IconTrophy, IconUsersGroup } from '@tabler/icons-react';
import { getCreatorStatsAction } from '../actions/get-creator-stats';

type TCreatorProfileStatsProps = {
  username: string;
};

export const CreatorProfileStats = async ({ username }: TCreatorProfileStatsProps) => {
  const { data, serverError } = await getCreatorStatsAction({ username });

  if (serverError || !data) {
    return null;
  }

  const stats = [
    { icon: IconStars, label: 'Челленджей', value: data.challengesCount, color: '#ffffff', iconColor: '#ffffff' },
    { icon: IconUsersGroup, label: 'Подписчиков', value: '—', color: '#818cf8', iconColor: '#818cf8' },
    { icon: IconPercentage, label: 'Сред. завершение', value: `${data.avgCompletionRate}%`, color: '#10b981', iconColor: '#10b981' },
    { icon: IconTrophy, label: 'Достижения', value: data.achievementsCount, color: '#f59e0b', iconColor: '#f59e0b' },
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
              <Text size="sm" c="#64748b">
                {label}
              </Text>
            </Stack>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};
