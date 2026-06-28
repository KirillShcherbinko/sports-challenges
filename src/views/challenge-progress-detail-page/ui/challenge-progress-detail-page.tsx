import { ChallengeProgressStats } from '@/widgets/challenge-progress-stats';
import { DailyTaskCardWidget } from '@/widgets/daily-task-card';
import { TaskCompletionsList } from '@/widgets/task-completions-list';
import { CompleteTaskButton } from '@/features/complete-task-button';
import { SkipTaskButton } from '@/features/skip-task-button';
import { Center, Divider, Group, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

type TChallengeProgressDetailPageProps = {
  challengeId: string;
};

export const ChallengeProgressDetailPage = ({ challengeId }: TChallengeProgressDetailPageProps) => {
  return (
    <Stack maw={600} w="100%" py={24} px={48} gap={24}>
      <Text fw={700} fz={28}>
        Прогресс челленджа
      </Text>

      <Suspense fallback={<Center h={100}><Loader /></Center>}>
        <ChallengeProgressStats challengeId={challengeId} />
      </Suspense>

      <Divider />

      <Stack gap={16}>
        <Text fw={600} fz={18}>
          Задание на сегодня
        </Text>
        <Suspense fallback={<Center h={100}><Loader /></Center>}>
          <DailyTaskCardWidget challengeId={challengeId} />
        </Suspense>
        <Group gap="sm">
          <CompleteTaskButton />
          <SkipTaskButton />
        </Group>
      </Stack>

      <Divider />

      <Suspense fallback={<Center h={100}><Loader /></Center>}>
        <TaskCompletionsList challengeId={challengeId} />
      </Suspense>
    </Stack>
  );
};
