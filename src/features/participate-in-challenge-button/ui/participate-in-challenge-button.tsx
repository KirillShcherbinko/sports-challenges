'use client';

import { Button } from '@mantine/core';
import { useParams } from 'next/navigation';
import { participateInChallengeAction } from '../actions/participate-in-challenge';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';

export const ParticipateInChallengeButton = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [isPending, startTransition] = useTransition();

  const handleChallengeParticipation = async () => {
    startTransition(async () => {
      const { serverError } = await participateInChallengeAction(challengeId);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }
    });
  };

  return (
    <Button variant="filled" onClick={handleChallengeParticipation} loading={isPending}>
      Участвовать
    </Button>
  );
};
