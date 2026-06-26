import { Card, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { getMyChallengeProgressAction } from '../actions';
import { CHALLENGE_PROGRESS_STATS } from '../config/CHALLENGE_PROGRESS_STATS';

type TChallengeProgressStatsProps = {
  challengeId: string;
};

export const ChallengeProgressStats = async ({ challengeId }: TChallengeProgressStatsProps) => {
  const { data, serverError } = await getMyChallengeProgressAction({ challengeId });

  if (serverError || !data) {
    return null;
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
      {CHALLENGE_PROGRESS_STATS.map(({ icon: Icon, label, color, iconColor, key }) => {
        const value = key === 'completionPercentage' ? `${data[key]}%` : data[key];
        return (
          <Card key={label} padding="lg">
            <Group gap="sm">
              <Icon size={28} color={iconColor} />
              <Stack gap={0}>
                <Text fw={700} fz="xl" c={color}>
                  {value}
                </Text>
                <Text size="sm" c="var(--mantine-color-dark-3)">
                  {label}
                </Text>
              </Stack>
            </Group>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
