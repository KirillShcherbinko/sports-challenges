import { Card, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconChecklist, IconFlag, IconStars, IconTrophy } from '@tabler/icons-react';
import { getProfileStatsAction, getUserProfileStatsAction } from '../actions';

type TProfileStatsProps = {
  profileUsername?: string;
};

const statsConfig = [
  { icon: IconFlag, label: 'Челленджей пройдено', color: '#ffffff', iconColor: 'var(--mantine-color-indigo-4)' },
  { icon: IconChecklist, label: 'Завершено', color: '#10b981', iconColor: '#10b981' },
  { icon: IconStars, label: 'Создано', color: '#f59e0b', iconColor: '#f59e0b' },
  { icon: IconTrophy, label: 'Достижения', color: '#818cf8', iconColor: '#818cf8' },
] as const;

export const ProfileStats = async ({ profileUsername }: TProfileStatsProps) => {
  const { data, serverError } = profileUsername
    ? await getUserProfileStatsAction(profileUsername)
    : await getProfileStatsAction();

  if (serverError || !data) {
    return null;
  }

  const values = [data.challengesCompleted, data.completedTasks, data.createdChallenges, data.achievementsCount];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
      {statsConfig.map(({ icon: Icon, label, color, iconColor }, index) => (
        <Card key={label} radius="lg" bg="#1a202c" padding="lg">
          <Group gap="sm">
            <Icon size={28} color={iconColor} />
            <Stack gap={0}>
              <Text fw={700} fz="xl" c={color}>
                {values[index]}
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
