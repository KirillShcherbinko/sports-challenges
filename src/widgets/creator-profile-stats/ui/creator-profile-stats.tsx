import { Card, Group, SimpleGrid, Stack, Text } from '@mantine/core';
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
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
      {CREATOR_PROFILE_STATS.map(({ icon: Icon, label, color, iconColor, key }) => {
        const value = key === 'avgCompletionRate' ? `${data[key]}%` : data[key];
        return (
          <Card key={label} padding="lg">
            <Group gap="sm">
              <Icon size={28} color={iconColor} />
              <Stack gap={0}>
                <Text fw={700} fz="xl" c={color}>
                  {value}
                </Text>
                <Text size="sm" c="var(--mantine-color-dark-4)">
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
