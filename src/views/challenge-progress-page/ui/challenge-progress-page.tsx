import { ChallengeProgressStats } from '@/widgets/challenge-progress-stats';
import { DailyTasksList } from '@/widgets/daily-tasks-list';
import { TaskCompletionsList } from '@/widgets/task-completions-list';
import { CompleteTaskButton } from '@/features/complete-task-button';
import { SkipTaskButton } from '@/features/skip-task-button';
import { Center, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

type TChallengeProgressPageProps = {
  challengeId: string;
};

export const ChallengeProgressPage = ({ challengeId }: TChallengeProgressPageProps) => {
  return (
    <Stack maw={800} w="100%" p={24} gap={24}>
      <Text fw={700} fz={28}>
        Прогресс челленджа
      </Text>

      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <ChallengeProgressStats challengeId={challengeId} />
      </Suspense>

      <Stack gap={16}>
        <Text fw={600} fz={18}>
          Задания на сегодня
        </Text>
        <Suspense
          fallback={
            <Center h={100}>
              <Loader />
            </Center>
          }
        >
          <DailyTasksList challengeId={challengeId} />
        </Suspense>
        <Stack gap="sm">
          <CompleteTaskButton />
          <SkipTaskButton />
        </Stack>
      </Stack>

      <Stack gap={16}>
        <Text fw={600} fz={18}>
          История выполнений
        </Text>
        <Suspense
          fallback={
            <Center h={100}>
              <Loader />
            </Center>
          }
        >
          <TaskCompletionsList challengeId={challengeId} />
        </Suspense>
      </Stack>
    </Stack>
  );
};
