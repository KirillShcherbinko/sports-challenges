import { Center, Stack, Text } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';

export default function AchievementsRoute() {
  return (
    <Stack maw={800} w="100%" p={24} gap={24} align="center">
      <Text fw={700} fz={28}>
        Достижения
      </Text>
      <Center h={200}>
        <Stack align="center" gap="md">
          <IconTrophy size={48} color="var(--mantine-color-dark-4)" />
          <Text c="var(--mantine-color-dark-3)">Раздел в разработке</Text>
        </Stack>
      </Center>
    </Stack>
  );
}
