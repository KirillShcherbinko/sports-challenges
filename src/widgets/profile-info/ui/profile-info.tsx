import { Avatar, Badge, Card, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core';
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
    const retryFn = profileUsername
      ? getUserProfileAction.bind(null, profileUsername)
      : getMyProfileAction.bind(null);
    return <ErrorAlert errorMessage={serverError} retryFn={retryFn} />;
  }

  if (!data) {
    notFound();
  }

  const isOwnProfile = !profileUsername;

  return (
    <Card radius="xl" padding={32} withBorder maw={520} w="100%" bg="var(--mantine-color-dark-8)" style={{ borderColor: 'var(--mantine-color-dark-6)' }}>
      <Stack gap={24}>
        <Group justify="space-between" align="flex-start">
          <Group gap={12}>
            <Avatar src={data.avatarUrl} size={96} radius="xl" color="brand" />
            <Stack gap={4}>
              <Text fw={700} fz="xl" c="var(--mantine-color-dark-0)">
                {data.username}
              </Text>
              <Badge color="var(--mantine-color-brand-6)" radius="xl" variant="filled" w="fit-content">
                {FITNESS_LEVEL_LABELS[data.fitnessLevel]}
              </Badge>
            </Stack>
          </Group>
          {isOwnProfile && (
            <Link href={ERoutes.PROFILE_EDIT} style={{ textDecoration: 'none' }}>
              <Group gap={6} px={16} py={8} style={{ borderRadius: 8, border: '1px solid var(--mantine-color-dark-6)', cursor: 'pointer' }}>
                <IconPencil size={14} color="var(--mantine-color-dark-2)" />
                <Text fz={14} c="var(--mantine-color-dark-2)">Редактировать</Text>
              </Group>
            </Link>
          )}
        </Group>

        {data.bio && (
          <>
            <Divider color="var(--mantine-color-dark-6)" />
            <Text fz={18} fw={600} c="var(--mantine-color-dark-0)">
              Обо мне
            </Text>
            <Text c="var(--mantine-color-dark-4)">{data.bio}</Text>
          </>
        )}

        {data.preferences && data.preferences.length > 0 && (
          <>
            <Divider color="var(--mantine-color-dark-6)" />
            <Text fz={18} fw={600} c="var(--mantine-color-dark-0)">
              Предпочтения
            </Text>
            <Group gap={8}>
              {data.preferences.map((pref) => (
                <Badge key={pref} color="var(--mantine-color-brand-6)" radius="xl" variant="filled">
                  {FITNESS_CATEGORY_LABELS[pref]}
                </Badge>
              ))}
            </Group>
          </>
        )}

        <Divider color="var(--mantine-color-dark-6)" />

        <SimpleGrid cols={2} spacing={16}>
          <Group gap={12} p={16} bg="var(--mantine-color-dark-7)" style={{ borderRadius: 12 }}>
            <IconBolt size={20} color="var(--mantine-color-brand-5)" />
            <Stack gap={2}>
              <Text fw={700} fz="xl" c="var(--mantine-color-dark-0)">{data.streakCount}</Text>
              <Text size="sm" c="var(--mantine-color-dark-4)">
                Дней подряд
              </Text>
            </Stack>
          </Group>

          <Group gap={12} p={16} bg="var(--mantine-color-dark-7)" style={{ borderRadius: 12 }}>
            <IconChecklist size={20} color="var(--mantine-color-brand-5)" />
            <Stack gap={2}>
              <Text fw={700} fz="xl" c="var(--mantine-color-dark-0)">{data.totalCompletedTasks}</Text>
              <Text size="sm" c="var(--mantine-color-dark-4)">
                Выполнено заданий
              </Text>
            </Stack>
          </Group>
        </SimpleGrid>
      </Stack>
    </Card>
  );
};
