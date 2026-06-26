'use client';

import { Button } from '@mantine/core';
import { useParams } from 'next/navigation';
import { deleteChallengeAction } from '../actions/delete-challenge';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';

export const DeleteChallengeButton = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [isPending, startTransition] = useTransition();

  const handleChallengeDeletion = async () => {
    startTransition(async () => {
      const { data: challenge, serverError } = await deleteChallengeAction(challengeId);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }

      if (challenge) {
        notifications.show({
          title: 'Успех',
          message: `Челлендж ${challenge.title} успешно удалён`,
          color: 'green',
        });
      }
    });
  };

  return (
    <Button variant="filled" onClick={handleChallengeDeletion} loading={isPending}>
      Удалить
    </Button>
  );
};
