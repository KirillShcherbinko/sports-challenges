'use client';

import { Button } from '@mantine/core';
import { useParams } from 'next/navigation';
import { publishChallengeAction } from '../actions/publish-challenge';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';

export const PublishChallengeButton = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [isPending, startTransition] = useTransition();

  const handleChallengePublication = async () => {
    startTransition(async () => {
      const { serverError } = await publishChallengeAction(challengeId);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }
    });
  };

  return (
    <Button variant="filled" color="success" onClick={handleChallengePublication} loading={isPending}>
      Опубликовать
    </Button>
  );
};
