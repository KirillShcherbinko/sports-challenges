import { Avatar, Badge, Card, Divider, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBolt, IconChecklist, IconPencil } from '@tabler/icons-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ERoutes, ErrorAlert, FITNESS_CATEGORY_LABELS, FITNESS_LEVEL_LABELS } from '@/shared';
import { getUserProfileAction } from '../actions/get-user-profile';
import { getMyProfileAction } from '../actions/get-my-profile';

type TProfileInfoProps = {
  profileUsername?: string;
};

export const ProfileInfo = async ({ profileUsername }: TProfileInfoProps) => {
  const { data, serverError } = profileUsername
    ? await getUserProfileAction(profileUsername)
    : await getMyProfileAction();

  if (serverError) {
    return (
      <ErrorAlert
        errorMessage={serverError}
        retryFn={async () =>
          profileUsername ? await getUserProfileAction(profileUsername) : await getMyProfileAction()
        }
      />
    );
  }

  if (!data) {
    notFound();
  }

  const isOwnProfile = !profileUsername;

  return (
    <Card radius="xl" padding="xl" withBorder maw={520} w="100%">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start">
          <Group align="flex-start">
            <Avatar src={data.avatarUrl} size={96} radius="xl" />
            <Stack gap={4}>
              <Text fw={700} fz="xl">
                {data.username}
              </Text>
              <Badge variant="light" w="fit-content">
                {FITNESS_LEVEL_LABELS[data.fitnessLevel]}
              </Badge>
            </Stack>
          </Group>
          {isOwnProfile && (
            <Badge
              component={Link}
              href={ERoutes.PROFILE_EDIT}
              variant="outline"
              size="lg"
              radius="sm"
              leftSection={<IconPencil size={14} />}
              styles={{ label: { cursor: 'pointer' } }}
            >
              Редактировать
            </Badge>
          )}
        </Group>

        {data.bio && (
          <>
            <Divider />
            <Title component="h1" order={1}>
              Обо мне
            </Title>
            <Text c="var(--mantine-color-dark-3)">{data.bio}</Text>
          </>
        )}

        {data.preferences && data.preferences.length > 0 && (
          <>
            <Divider />
            <Title component="h1" order={1}>
              Предпочтения
            </Title>
            <Group gap="xs">
              {data.preferences.map((pref) => (
                <Badge key={pref} variant="light">
                  {FITNESS_CATEGORY_LABELS[pref]}
                </Badge>
              ))}
            </Group>
          </>
        )}

        <Divider />

        <SimpleGrid cols={2}>
          <Card radius="lg" withBorder>
            <Group>
              <IconBolt size={20} />
              <Stack gap={0}>
                <Text fw={700}>{data.streakCount}</Text>
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
                <Text fw={700}>{data.totalCompletedTasks}</Text>
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
