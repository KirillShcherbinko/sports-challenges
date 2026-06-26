import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { ERoutes } from '@/shared';

export const HeaderLogo = () => {
  return (
    <Link href={ERoutes.HOME} style={{ textDecoration: 'none' }}>
      <Group gap={8}>
        <Text fz={20}>⚡</Text>
        <Text fw={700} fz={18}>
          SportsChallenges
        </Text>
      </Group>
    </Link>
  );
};
