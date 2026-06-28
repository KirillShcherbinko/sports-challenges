import type { ChallengeDifficulty, FitnessCategory } from '@/shared/types';
import { Badge, Group, Image, Stack, Text } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type TChallengeCardProps = {
  id: string;
  route: string;
  title: string;
  description: string;
  coverImageUrl: string | null;
  category: FitnessCategory;
  difficulty: ChallengeDifficulty;
  participantsCount: number;
  likesCountSlot: ReactNode;
};

export const ChallengeCard = ({
  id,
  route,
  title,
  description,
  coverImageUrl,
  category,
  difficulty,
  participantsCount,
  likesCountSlot,
}: TChallengeCardProps) => {
  return (
    <Stack
      p="md"
      gap="sm"
      bg="var(--mantine-color-dark-8)"
      style={{ borderRadius: 'var(--mantine-radius-md)', border: '1px solid var(--mantine-color-dark-6)' }}
    >
      {coverImageUrl && <Image src={coverImageUrl} alt={title} radius="md" />}
      <Link href={`${route}/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Stack gap={8}>
          <Group gap={8}>
            <Badge color="var(--mantine-color-brand-6)" radius="xl" size="sm" variant="filled">
              {category}
            </Badge>
            <Badge color="var(--mantine-color-dark-6)" radius="xl" size="sm" variant="filled">
              {difficulty}
            </Badge>
          </Group>
          <Text fw={600} fz="md" c="var(--mantine-color-dark-0)">
            {title}
          </Text>
          <Text c="var(--mantine-color-dark-4)" size="sm">
            {description}
          </Text>
        </Stack>
      </Link>
      <Group gap={8}>
        <Group gap={4}>
          <IconUsers size={16} color="var(--mantine-color-dark-4)" />
          <Text c="var(--mantine-color-dark-4)" size="xs">
            {participantsCount} участника
          </Text>
        </Group>

        {likesCountSlot}
      </Group>
    </Stack>
  );
};
