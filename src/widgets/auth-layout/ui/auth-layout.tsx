import { Card, Center } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Center h="100vh" maw={450} w="100%">
      <Card p="xl" w="100%">
        {children}
      </Card>
    </Center>
  );
};
