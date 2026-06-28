'use client';

import { Button } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { deleteDailyTaskAction } from '../actions/delete-daily-task';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';

type TDeleteChallengeButtonProps = {
  dayNumber: number;
};

export const DeleteDailyTaskButton = ({ dayNumber }: TDeleteChallengeButtonProps) => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChallengeDeletion = async () => {
    startTransition(async () => {
      const { data: dailyTask, serverError } = await deleteDailyTaskAction({ challengeId, dayNumber });

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }

      if (dailyTask) {
        notifications.show({
          title: 'Успех',
          message: `Задание ${dailyTask.title} успешно удалёно`,
          color: 'green',
        });
        router.refresh();
      }
    });
  };

  return (
    <Button variant="filled" onClick={handleChallengeDeletion} loading={isPending}>
      Удалить
    </Button>
  );
};
