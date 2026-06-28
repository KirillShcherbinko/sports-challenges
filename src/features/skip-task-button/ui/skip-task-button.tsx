'use client';

import { Button } from '@mantine/core';
import { useParams } from 'next/navigation';
import { skipTaskAction } from '../actions/skip-task';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';

export const SkipTaskButton = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [isPending, startTransition] = useTransition();

  const handleTaskSkip = async () => {
    startTransition(async () => {
      const { data: taskSkip, serverError } = await skipTaskAction(challengeId);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }

      if (taskSkip) {
        notifications.show({
          title: 'Успех',
          message: `Вы пропустили задание "${taskSkip.dailyTask.title}" за ${taskSkip.dailyTask.dayNumber} день`,
          color: 'green',
        });
      }
    });
  };

  return (
    <Button variant="default" onClick={handleTaskSkip} loading={isPending}>
      Пропустить
    </Button>
  );
};
