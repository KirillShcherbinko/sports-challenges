import { Card, Group, SimpleGrid, Stack, Text } from '@mantine/core';
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
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
      {PROFILE_STATS.map(({ icon: Icon, label, color, iconColor, key }) => (
        <Card key={label} padding="lg">
          <Group gap="sm">
            <Icon size={28} color={iconColor} />
            <Stack gap={0}>
              <Text fw={700} fz="xl" c={color}>
                {data[key]}
              </Text>
              <Text size="sm" c="var(--mantine-color-dark-4)">
                {label}
              </Text>
            </Stack>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};
