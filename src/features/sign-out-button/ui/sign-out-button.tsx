'use client';

import { Button } from '@mantine/core';
import { signOutAction } from '../actions/sign-out';
import { handleFormActionErrors, EActionStatus } from '@/shared';
import { useRouter } from 'next/navigation';
import { IconLogout } from '@tabler/icons-react';
import { useState, useTransition } from 'react';

export const SignOutButton = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    setIsLoading(true);

    const state = await signOutAction();

    handleFormActionErrors({ state });

    if (state.status === EActionStatus.Success && state.redirect) {
      const redirect = state.redirect;

      startTransition(() => {
        router.push(redirect);
      });

      return;
    }

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
      rightSection={!isPending && <IconLogout color="var(--mantine-color-dark-1)" size={24} />}
    >
      Выйти
    </Button>
  );
};
