import { Group, Stack, Text } from '@mantine/core';
import { getProfileStatsAction, getUserProfileStatsAction } from '../actions';
import { PROFILE_STATS } from '../config/PROFILE_STATS';

type TProfileStatsProps = {
  profileUsername?: string;
};

export const ProfileStats = async ({ profileUsername }: TProfileStatsProps) => {
  const { data, serverError } = profileUsername
    ? await getUserProfileStatsAction(profileUsername)
    : await getProfileStatsAction();

  if (serverError || !data) {
    return null;
  }

  return (
    <Group gap={16} wrap="wrap">
      {PROFILE_STATS.map(({ icon: Icon, label, color, iconColor, key }) => (
        <Group key={label} gap={12} p={16} bg="var(--mantine-color-dark-8)" style={{ flex: 1, borderRadius: 12, border: '1px solid var(--mantine-color-dark-6)' }}>
          <Icon size={28} color={iconColor} />
          <Stack gap={2}>
            <Text fw={700} fz="xl" c={color}>
              {data[key]}
            </Text>
            <Text size="sm" c="var(--mantine-color-dark-4)">
              {label}
            </Text>
          </Stack>
        </Group>
      ))}
    </Group>
  );
};
