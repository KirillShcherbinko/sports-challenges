import { DailyTasksList } from '@/widgets/daily-tasks-list';
import { EditDailyTaskForm } from '@/features/edit-daily-task-form';
import { PublishChallengeButton } from '@/features/publish-challenge-button';
import { Center, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

type TPublishChallengePageProps = {
  challengeId: string;
};

export const PublishChallengePage = ({ challengeId }: TPublishChallengePageProps) => {
  return (
    <Stack maw={700} w="100%" p={24} gap={24} align="center">
      <Text fw={700} fz={28}>
        Настроить задания
      </Text>

      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <EditDailyTaskForm dayNumber={0} />
      </Suspense>

      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <DailyTasksList challengeId={challengeId} />
      </Suspense>

      <PublishChallengeButton />
    </Stack>
  );
};
