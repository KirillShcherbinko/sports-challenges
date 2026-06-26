import { Card, Stack, Title } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export const EditProfileContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <Card maw={700} w="100%">
      <Stack gap="xl" w="100%" align="center">
        <Title ta="center">Редактировать профиль</Title>
        {children}
      </Stack>
    </Card>
  );
};
