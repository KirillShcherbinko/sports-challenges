import type { ChallengeDifficulty, FitnessCategory } from '@/shared/types';
import { Badge, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';

type TChallengeCardProps = {
  title: string;
  description: string;
  coverImageUrl: string | null;
  category: FitnessCategory;
  difficulty: ChallengeDifficulty;
  participantsCountSlot: ReactNode;
  likesCountSlot: ReactNode;
};

export const ChallengeCard = ({
  title,
  description,
  coverImageUrl,
  category,
  difficulty,
  participantsCountSlot,
  likesCountSlot,
}: TChallengeCardProps) => {
  return (
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
        {participantsCountSlot}
        {likesCountSlot}
      </Group>
    </Card>
  );
};
