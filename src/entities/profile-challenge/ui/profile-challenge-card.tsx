import { Group, Stack, Text } from '@mantine/core';
import { ERoutes } from '@/shared';
import Link from 'next/link';
import type { ReactNode } from 'react';

type TProfileChallengeCardProps = {
  challengeId: string;
  title: string;
  coverImageUrl: string | null;
  currentDay: number;
  durationDays: number;
  percentage: number;
  statusBadgeSlot?: ReactNode;
  actionsSlot?: ReactNode;
};

export const ProfileChallengeCard = ({
  challengeId,
  title,
  coverImageUrl,
  currentDay,
  durationDays,
  percentage,
  statusBadgeSlot,
  actionsSlot,
}: TProfileChallengeCardProps) => {
  return (
    <Link href={`${ERoutes.CHALLENGES_PROGRESS}/${challengeId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Stack
        p="md"
        gap="sm"
        bg="var(--mantine-color-dark-8)"
        style={{ borderRadius: 'var(--mantine-radius-md)', border: '1px solid var(--mantine-color-dark-6)' }}
      >
        {coverImageUrl && (
          <div
            style={{
              width: '100%',
              height: 120,
              borderRadius: 'var(--mantine-radius-md)',
              backgroundImage: `url(${coverImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        <Group gap="sm" align="center" wrap="nowrap">
          <Stack
            align="center"
            justify="center"
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: 'var(--mantine-color-brand-6)',
              flexShrink: 0,
            }}
          >
            <Text c="var(--mantine-color-dark-0)" fw={600} fz="lg">
              {title.charAt(0).toUpperCase()}
            </Text>
          </Stack>
          <Stack gap={4} style={{ flex: 1 }}>
            <Text fw={600} fz="sm" c="var(--mantine-color-dark-0)">{title}</Text>
            <Text c="var(--mantine-color-dark-4)" size="xs">
              День {currentDay} из {durationDays} • {percentage}%
            </Text>
          </Stack>
          <Stack style={{ width: 120, height: 6, borderRadius: 3, backgroundColor: 'var(--mantine-color-dark-6)', flexShrink: 0 }}>
            <div
              style={{
                width: `${percentage}%`,
                height: 6,
                borderRadius: 3,
                backgroundColor: 'var(--mantine-color-brand-5)',
              }}
            />
          </Stack>
        </Group>
        {statusBadgeSlot}
        {actionsSlot}
      </Stack>
    </Link>
  );
};
