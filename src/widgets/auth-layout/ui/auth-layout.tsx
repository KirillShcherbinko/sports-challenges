import { Card, Center } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Center h="100vh" maw={450} w="100%">
      <Card radius="md" p={32} w="100%" withBorder bg="var(--mantine-color-dark-8)" style={{ borderColor: 'var(--mantine-color-dark-6)' }}>
        {children}
      </Card>
    </Center>
  );
};
