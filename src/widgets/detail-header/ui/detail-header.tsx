'use client';

import { ActionIcon, Group, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { DetailHeaderServerTitle } from './detail-header-title';
import { DetailHeaderTitleSkeleton } from './detail-header-title-skeleton';

type DetailHeaderProps = {
  title: string;
  challengeId?: string;
};

export const DetailHeader = ({ title = 'Заголовок', challengeId }: DetailHeaderProps) => {
  const router = useRouter();

  return (
    <Group
      h={64}
      px={24}
      gap={12}
      align="center"
      bg="var(--mantine-color-dark-8)"
      style={{ borderBottom: '1px solid var(--mantine-color-dark-6)' }}
    >
      <ActionIcon
        variant="default"
        size={36}
        radius={8}
        onClick={() => router.back()}
        aria-label="Go back"
        style={{ backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'transparent' }}
      >
        <IconArrowLeft size={20} />
      </ActionIcon>
      {challengeId ? (
        <Suspense fallback={<DetailHeaderTitleSkeleton />}>
          <DetailHeaderServerTitle challengeId={challengeId} fallbackTitle={title ?? 'Загрузка...'} />
        </Suspense>
      ) : (
        <Text fw={600} fz={18} c="var(--mantine-color-dark-0)">
          {title}
        </Text>
      )}
    </Group>
  );
};
