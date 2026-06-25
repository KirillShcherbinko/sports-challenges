import { Avatar, Badge, Card, Divider, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconPencil, IconUsersGroup } from '@tabler/icons-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  CHALLENGE_DIFFICULTY_LABELS,
  ERoutes,
  ErrorAlert,
  FITNESS_CATEGORY_LABELS,
  FITNESS_LEVEL_LABELS,
} from '@/shared';
import { getChallengeAction } from '../actions/get-challenge';
import { OpenDeleteModal } from '@/features/open-delete-modal';
import { LikeButton } from '@/features/like-button';
import { DeleteChallengeModalContent } from './delete-challenge-modal-content';

type TChallengeInfoProps = {
  challengeId: string;
};

export const ChallengeInfo = async ({ challengeId }: TChallengeInfoProps) => {
  const { data, serverError } = await getChallengeAction(challengeId);

  if (serverError) {
    return (
      <ErrorAlert
        errorMessage={serverError}
        retryFn={async () => await getChallengeAction(challengeId)}
      />
    );
  }

  if (!data) {
    notFound();
  }

  const { challenge, isOwner } = data;

  return (
    <Card radius="xl" padding="xl" withBorder maw={520} w="100%">
      <Stack gap="lg">
        {challenge.coverImageUrl && (
          <Image src={challenge.coverImageUrl} alt={challenge.title} radius="md" />
        )}

        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Title component="h1" order={1}>
              {challenge.title}
            </Title>
            <Group gap="sm">
              <Badge variant="light">
                {CHALLENGE_DIFFICULTY_LABELS[challenge.difficulty]}
              </Badge>
              <Badge variant="default">Дней: {challenge.durationDays}</Badge>
            </Group>
          </Stack>
          {isOwner && (
            <Group gap="xs">
              <Badge
                component={Link}
                href={ERoutes.CHALLENGE_EDIT}
                variant="outline"
                size="lg"
                radius="sm"
                leftSection={<IconPencil size={14} />}
                styles={{ label: { cursor: 'pointer' } }}
              >
                Редактировать
              </Badge>
              <OpenDeleteModal
                modalContent={({ close }) => <DeleteChallengeModalContent onClose={close} />}
              />
            </Group>
          )}
        </Group>

        <Divider />

        <Title component="h1" order={1}>
          Описание
        </Title>
        <Text c="var(--mantine-color-dark-3)">{challenge.description}</Text>

        <Divider />

        {challenge.categories.length > 0 && (
          <>
            <Title component="h1" order={1}>
              Категории
            </Title>
            <Group gap="xs">
              {challenge.categories.map((cat) => (
                <Badge key={cat} variant="light">
                  {FITNESS_CATEGORY_LABELS[cat]}
                </Badge>
              ))}
            </Group>
            <Divider />
          </>
        )}

        <Title component="h1" order={1}>
          Автор
        </Title>
        <Group>
          <Avatar src={challenge.creator.avatarUrl} size={48} radius="xl" />
          <Stack gap={0}>
            <Text fw={700}>{challenge.creator.username}</Text>
            <Badge variant="light" size="sm">
              {FITNESS_LEVEL_LABELS[challenge.creator.fitnessLevel]}
            </Badge>
          </Stack>
        </Group>

        <Divider />

        <SimpleGrid cols={2}>
          <Card radius="lg" withBorder>
            <Group>
              <IconUsersGroup size={20} />
              <Stack gap={0}>
                <Text fw={700}>{challenge.participantsCount}</Text>
                <Text size="sm" c="var(--mantine-color-dark-3)">
                  Участников
                </Text>
              </Stack>
            </Group>
          </Card>

          <Card radius="lg" withBorder>
            <LikeButton challengeId={challenge.id} />
          </Card>
        </SimpleGrid>
      </Stack>
    </Card>
  );
};
