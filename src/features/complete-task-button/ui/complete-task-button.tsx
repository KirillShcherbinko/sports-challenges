'use client';

import { Button } from '@mantine/core';
import { useParams } from 'next/navigation';
import { completeTaskAction } from '../actions/complete-task';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';

export const CompleteTaskButton = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [isPending, startTransition] = useTransition();

  const handleTaskCompletion = async () => {
    startTransition(async () => {
      const { data: taskCompletion, serverError } = await completeTaskAction(challengeId);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }

      if (taskCompletion) {
        notifications.show({
          title: 'Успех',
          message: `Задание "${taskCompletion.dailyTask.title}" за ${taskCompletion.dailyTask.dayNumber} день выполнено`,
          color: 'green',
        });
      }
    });
  };

  return (
    <Button variant="filled" color="success" onClick={handleTaskCompletion} loading={isPending}>
      Выполнить
    </Button>
  );
};
