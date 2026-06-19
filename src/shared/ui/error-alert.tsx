'use client';

import { Button, Stack, Text } from '@mantine/core';

type TErrorAlertProps = {
  errorMessage: string;
  retryFn: () => void;
};

export const ErrorAlert = ({ errorMessage, retryFn }: TErrorAlertProps) => {
  return (
    <Stack align="center" gap="sm">
      <Text c="var(--mantine-color-dark-2)">{errorMessage}</Text>
      <Button onClick={() => retryFn()}>Повторить</Button>
    </Stack>
  );
};
