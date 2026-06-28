import { Avatar, Badge, Card, Divider, Group, Image, SimpleGrid, Stack, Text } from '@mantine/core';
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
import { ChallengeDeleteActions } from './challenge-delete-actions';
import { LikeButton } from '@/features/like-button';

type TChallengeInfoProps = {
  challengeId: string;
};

export const ChallengeInfo = async ({ challengeId }: TChallengeInfoProps) => {
  const { data, serverError } = await getChallengeAction(challengeId);

  if (serverError) {
    const retryFn = getChallengeAction.bind(null, challengeId);
    return <ErrorAlert errorMessage={serverError} retryFn={retryFn} />;
  }

  if (!data) {
    notFound();
  }

  const { challenge, isOwner } = data;

  return (
    <Card radius="xl" padding={32} withBorder maw={520} w="100%" bg="var(--mantine-color-dark-8)" style={{ borderColor: 'var(--mantine-color-dark-6)' }}>
      <Stack gap={24}>
        {challenge.coverImageUrl && <Image src={challenge.coverImageUrl} alt={challenge.title} radius="md" h={200} />}

        <Group justify="space-between" align="flex-start">
          <Stack gap={8}>
            <Text fz={24} fw={700} c="var(--mantine-color-dark-0)">
              {challenge.title}
            </Text>
            <Group gap={8}>
              <Badge color="var(--mantine-color-brand-6)" radius="xl" variant="filled">{CHALLENGE_DIFFICULTY_LABELS[challenge.difficulty]}</Badge>
              <Badge color="var(--mantine-color-dark-6)" radius="xl" variant="filled">Дней: {challenge.durationDays}</Badge>
            </Group>
          </Stack>
          {isOwner && (
            <Group gap={8}>
              <Link href={`${ERoutes.CHALLENGES}/${challengeId}/edit`} style={{ textDecoration: 'none' }}>
                <Group gap={6} px={16} py={8} style={{ borderRadius: 8, border: '1px solid var(--mantine-color-dark-6)', cursor: 'pointer' }}>
                  <IconPencil size={14} color="var(--mantine-color-dark-2)" />
                  <Text fz={14} c="var(--mantine-color-dark-2)">Редактировать</Text>
                </Group>
              </Link>
              <ChallengeDeleteActions />
            </Group>
          )}
        </Group>

        <Divider color="var(--mantine-color-dark-6)" />

        <Text fz={18} fw={600} c="var(--mantine-color-dark-0)">
          Описание
        </Text>
        <Text c="var(--mantine-color-dark-4)">{challenge.description}</Text>

        <Divider color="var(--mantine-color-dark-6)" />

        {challenge.categories.length > 0 && (
          <>
            <Text fz={18} fw={600} c="var(--mantine-color-dark-0)">
              Категории
            </Text>
            <Group gap={8}>
              {challenge.categories.map((cat) => (
                <Badge key={cat} color="var(--mantine-color-brand-6)" radius="xl" variant="filled">
                  {FITNESS_CATEGORY_LABELS[cat]}
                </Badge>
              ))}
            </Group>
            <Divider color="var(--mantine-color-dark-6)" />
          </>
        )}

        <Text fz={18} fw={600} c="var(--mantine-color-dark-0)">
          Автор
        </Text>
        <Group gap={12}>
          <Avatar src={challenge.creator.avatarUrl} size={48} radius="xl" color="brand" />
          <Stack gap={2}>
            <Text fw={700} fz={14} c="var(--mantine-color-dark-0)">{challenge.creator.username}</Text>
            <Badge color="var(--mantine-color-brand-6)" radius="xl" variant="filled" size="sm">
              {FITNESS_LEVEL_LABELS[challenge.creator.fitnessLevel]}
            </Badge>
          </Stack>
        </Group>

        <Divider color="var(--mantine-color-dark-6)" />

        <SimpleGrid cols={2} spacing={16}>
          <Group gap={12} p={16} bg="var(--mantine-color-dark-7)" style={{ borderRadius: 12 }}>
            <IconUsersGroup size={20} color="var(--mantine-color-brand-5)" />
            <Stack gap={2}>
              <Text fw={700} fz="xl" c="var(--mantine-color-dark-0)">{challenge.participantsCount}</Text>
              <Text size="sm" c="var(--mantine-color-dark-4)">
                Участников
              </Text>
            </Stack>
          </Group>

          <Group gap={12} p={16} bg="var(--mantine-color-dark-7)" style={{ borderRadius: 12 }}>
            <LikeButton challengeId={challenge.id} />
          </Group>
        </SimpleGrid>
      </Stack>
    </Card>
  );
};
