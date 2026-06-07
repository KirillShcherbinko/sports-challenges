'use client';

import { Button } from '@mantine/core';
import { signOutAction } from '../actions/sign-out';
import { IconLogout } from '@tabler/icons-react';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';

export const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(async () => {
      const { serverError } = await signOutAction();

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }
    });
  };

  return (
    <Button
      color="red"
      maw={250}
      w="100%"
      loading={isPending}
      disabled={isPending}
      onClick={handleSignOut}
      rightSection={<IconLogout size={24} />}
    >
      Выйти
    </Button>
  );
};
