'use client';

import { Button } from '@mantine/core';
import { signOutAction } from '../actions/sign-out';
import { handleFormActionErrors, EFormActionStatus } from '@/shared';
import { useRouter } from 'next/navigation';
import { IconLogout } from '@tabler/icons-react';

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const state = await signOutAction();
    handleFormActionErrors({ state });

    if (state.status === EFormActionStatus.Success && state.redirect) {
      router.push(state.redirect);
    }
  };

  return (
    <Button
      color="red"
      onClick={handleSignOut}
      rightSection={<IconLogout color="var(--mantine-color-dark-1)" size={32} />}
    >
      Выйти
    </Button>
  );
};
