import { Stack } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export const ProfilesListLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack maw={800} w="100%" align="center" gap={12}>
      {children}
    </Stack>
  );
};
