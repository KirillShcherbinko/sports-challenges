import type { ChallengeDifficulty, FitnessCategory } from '@/shared/types';
import { ERoutes } from '@/shared';
import { Badge, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import { IconUsersGroup } from '@tabler/icons-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type TChallengeCardProps = {
  id: string;
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
  title,
  description,
  coverImageUrl,
  category,
  difficulty,
  participantsCount,
  likesCountSlot,
}: TChallengeCardProps) => {
  return (
    <Link href={`${ERoutes.CHALLENGES}/${id}`} style={{ textDecoration: 'none' }}>
      <Card p="md">
        {coverImageUrl && <Image src={coverImageUrl} alt={title} />}
        <Group gap="sm">
          <Badge variant="default">{category}</Badge>
          <Badge variant="default">{difficulty}</Badge>
        </Group>
        <Stack>
          <Title component="h2" order={2}>
            {title}
          </Title>
          <Text c="var(--mantine-color-dark-2)">{description}</Text>
        </Stack>
        <Group justify="between">
          <Group gap="sm">
            <IconUsersGroup size={24} />
            <Text c="var(--mantine-color-dark-2)">{participantsCount}</Text>
          </Group>
          {likesCountSlot}
        </Group>
      </Card>
    </Link>
  );
};
