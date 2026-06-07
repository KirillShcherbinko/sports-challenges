'use client';

import type { ERoutes } from '@/shared';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

type TRedirectButtonProps = {
  buttonText: string;
  route: ERoutes;
};

export const RedirectButton = ({ buttonText, route }: TRedirectButtonProps) => {
  const router = useRouter();

  return <Button onClick={() => router.push(route)}>{buttonText}</Button>;
};
