'use client';

import { Button } from '@mantine/core';
import { signOutAction } from '../actions/sign-out';
import { useRouter } from 'next/navigation';
import { IconLogout } from '@tabler/icons-react';
import { useState, useTransition } from 'react';
import { notifications } from '@mantine/notifications';
import { ERoutes } from '@/shared';

export const SignOutButton = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    setIsLoading(true);

    const { serverError } = await signOutAction();

    if (serverError) {
      notifications.show({
        title: 'Ошибка',
        message: serverError,
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    startTransition(() => {
      router.push(ERoutes.SIGN_IN);
    });

    setIsLoading(false);
  };

  return (
    <Button
      color="red"
      maw={250}
      w="100%"
      loading={isPending || isLoading}
      disabled={isPending || isLoading}
      onClick={handleSignOut}
      rightSection={<IconLogout color="var(--mantine-color-dark-1)" size={24} />}
    >
      Выйти
    </Button>
  );
};
