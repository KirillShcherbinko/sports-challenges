import { Group, Stack, Text } from '@mantine/core';
import { getCreatorStatsAction } from '../actions/get-creator-stats';
import { CREATOR_PROFILE_STATS } from '../config/CREATOR_PROFILE_STATS';

type TCreatorProfileStatsProps = {
  username: string;
};

export const CreatorProfileStats = async ({ username }: TCreatorProfileStatsProps) => {
  const { data, serverError } = await getCreatorStatsAction({ username });

  if (serverError || !data) {
    return null;
  }

  return (
    <Group gap={16} wrap="wrap">
      {CREATOR_PROFILE_STATS.map(({ icon: Icon, label, color, iconColor, key }) => {
        const value = key === 'avgCompletionRate' ? `${data[key]}%` : data[key];
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
