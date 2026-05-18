import { Avatar, Badge, Card, Divider, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';

import { IconBolt, IconChecklist } from '@tabler/icons-react';

import { notFound, redirect } from 'next/navigation';
import { fetchProfileByUsername } from '../actions/fetch-profile-by-username';
import { fetchProfileById } from '../actions/fetch-profile-by-id';
import { FITNESS_LEVEL_COLORS } from '@/entities/profile/config/fitness-level-colors';
import { FITNESS_LEVEL_LABELS } from '@/entities/profile/config/fitness-level-labels';
import { EActionStatus, ERoutes } from '@/shared';

type TProfileInfoProps = {
  profileUsername?: string;
};

export const ProfileInfo = async ({ profileUsername }: TProfileInfoProps) => {
  const profile = profileUsername ? await fetchProfileByUsername(profileUsername) : await fetchProfileById();

  if (profile.status === EActionStatus.Error || !profile.data) {
    notFound();
  }

  if (profileUsername === profile.data.username) {
    redirect(ERoutes.PROFILE);
  }

  const { username, avatarUrl, bio, fitnessLevel, streakCount, totalCompletedTasks } = profile.data;

  return (
    <Card radius="xl" padding="xl" withBorder maw={520} w="100%">
      <Stack gap="lg">
        <Group align="flex-start">
          <Avatar src={avatarUrl} size={96} radius="xl" />
          <Stack gap={4}>
            <Text fw={700} fz="xl">
              {username}
            </Text>
            <Badge c={FITNESS_LEVEL_COLORS[fitnessLevel]} variant="light" w="fit-content">
              {FITNESS_LEVEL_LABELS[fitnessLevel]}
            </Badge>
          </Stack>
        </Group>

        {bio && (
          <>
            <Divider />
            <Title component="h1" order={1}>
              Обо мне
            </Title>
            <Text c="var(--mantine-color-dark-3)">{bio}</Text>
          </>
        )}

        <Divider />

        <SimpleGrid cols={2}>
          <Card radius="lg" withBorder>
            <Group>
              <IconBolt size={20} />
              <Stack gap={0}>
                <Text fw={700}>{streakCount}</Text>
                <Text size="sm" c="var(--mantine-color-dark-3)">
                  Дней подряд
                </Text>
              </Stack>
            </Group>
          </Card>

          <Card radius="lg" withBorder>
            <Group>
              <IconChecklist size={20} />
              <Stack gap={0}>
                <Text fw={700}>{totalCompletedTasks}</Text>
                <Text size="sm" c="var(--mantine-color-dark-3)">
                  Выполнено заданий
                </Text>
              </Stack>
            </Group>
          </Card>
        </SimpleGrid>
      </Stack>
    </Card>
  );
};
