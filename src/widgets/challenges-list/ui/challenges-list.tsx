// src/widgets/challenges-list/ui/challenges-list.tsx

import { Badge, Card, Group, Image, SimpleGrid, Stack, Text } from '@mantine/core';

import { getChallenges } from '../actions/get-challenges';

type Props = {
  searchParams?: {
    search?: string;
    category?: any;
    difficulty?: any;
    creatorId?: string;
    page?: string;
  };
};

export const ChallengesList = async ({ searchParams }: Props) => {
  const result = await getChallenges({
    search: searchParams?.search,
    creatorId: searchParams?.creatorId,
    category: searchParams?.category,
    difficulty: searchParams?.difficulty,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  if (!result.success || !result.data) {
    return <Text c="red">{result.error ?? 'Ошибка загрузки челленджей'}</Text>;
  }

  if (!result.data.items.length) {
    return <Text>Челленджи не найдены</Text>;
  }

  return (
    <SimpleGrid
      cols={{
        base: 1,
        sm: 2,
        lg: 3,
      }}
    >
      {result.data.items.map((challenge) => (
        <Card key={challenge.id} withBorder radius="lg" padding="lg">
          <Stack mt="md">
            <Group justify="space-between">
              <Badge>{challenge.category}</Badge>

              <Badge variant="light">{challenge.difficulty}</Badge>
            </Group>

            <Text fw={700} size="lg">
              {challenge.title}
            </Text>

            <Text size="sm" c="dimmed" lineClamp={3}>
              {challenge.description}
            </Text>

            <Group justify="space-between">
              <Text size="sm">🔥 {challenge.likesCount}</Text>

              <Text size="sm">👥 {challenge.participantsCount}</Text>
            </Group>

            <Text size="xs" c="dimmed">
              @{challenge.creator?.username ?? 'unknown'}
            </Text>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
};
