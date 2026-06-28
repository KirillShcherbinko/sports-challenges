import { Group, Stack, Text } from '@mantine/core';
import { getMyChallengeProgressAction } from '../actions';
import { CHALLENGE_PROGRESS_STATS } from '../config/CHALLENGE_PROGRESS_STATS';

type TChallengeProgressStatsProps = {
  challengeId: string;
};

export const ChallengeProgressStats = async ({ challengeId }: TChallengeProgressStatsProps) => {
  const { data } = await getMyChallengeProgressAction({ challengeId });

  const stats = data ?? { daysCompleted: 0, daysMissed: 0, currentStreak: 0, completionPercentage: 0 };

  return (
    <Group gap={16} wrap="wrap">
      {CHALLENGE_PROGRESS_STATS.map(({ icon: Icon, label, color, iconColor, key }) => {
        const value = key === 'completionPercentage' ? `${stats[key]}%` : stats[key];
        return (
          <Group key={label} gap={12} p={16} bg="var(--mantine-color-dark-8)" style={{ flex: 1, borderRadius: 12, border: '1px solid var(--mantine-color-dark-6)' }}>
            <Icon size={28} color={iconColor} />
            <Stack gap={2}>
              <Text fw={700} fz="xl" c={color}>
                {value}
              </Text>
              <Text size="sm" c="var(--mantine-color-dark-4)">
                {label}
              </Text>
            </Stack>
          </Group>
        );
      })}
    </Group>
  );
};
