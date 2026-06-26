import { ChallengeProgressStats } from '@/widgets/challenge-progress-stats';
import { getDailyTasksAction } from '@/widgets/daily-tasks-list/actions/get-daily-tasks';
import { DailyTaskCard } from '@/entities/daily-task';
import { CompleteTaskButton } from '@/features/complete-task-button';
import { SkipTaskButton } from '@/features/skip-task-button';
import { Center, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

type TChallengeProgressDetailPageProps = {
  challengeId: string;
};

const DailyTasks = async ({ challengeId }: { challengeId: string }) => {
  const { data: tasks, serverError } = await getDailyTasksAction(challengeId);

  if (serverError || !tasks || tasks.length === 0) {
    return null;
  }

  return (
    <Stack gap={12}>
      {tasks.map((task) => (
        <DailyTaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          exerciseType={task.exerciseType}
          dayNumber={task.dayNumber}
        />
      ))}
    </Stack>
  );
};

export const ChallengeProgressDetailPage = ({ challengeId }: TChallengeProgressDetailPageProps) => {
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
          <DailyTasks challengeId={challengeId} />
        </Suspense>
        <Stack gap="sm">
          <CompleteTaskButton />
          <SkipTaskButton />
        </Stack>
      </Stack>
    </Stack>
  );
};
