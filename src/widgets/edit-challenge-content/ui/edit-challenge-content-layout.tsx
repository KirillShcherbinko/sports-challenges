import { Card, Stack, Text } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export const EditChallengeContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <Card maw={700} w="100%" radius="xl" padding={32} withBorder bg="var(--mantine-color-dark-8)" style={{ borderColor: 'var(--mantine-color-dark-6)' }}>
      <Stack gap="xl" w="100%" align="center">
        <Text fz={24} fw={700} c="var(--mantine-color-dark-0)" ta="center">
          Редактировать челлендж
        </Text>
        {children}
      </Stack>
    </Card>
  );
};
