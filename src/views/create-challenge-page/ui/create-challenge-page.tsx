import { EditChallengeForm } from '@/features/edit-challenge-form';
import { Card, Stack, Text } from '@mantine/core';

export const CreateChallengePage = () => {
  return (
    <Stack w="100%" py={32} px={48} align="center">
      <Card w="100%" maw={700} radius="xl" padding={32} withBorder bg="var(--mantine-color-dark-8)" style={{ borderColor: 'var(--mantine-color-dark-6)' }}>
        <Stack gap="xl" w="100%" align="center">
          <Text fz={24} fw={700} c="var(--mantine-color-dark-0)" ta="center">
            Создать челлендж
          </Text>
          <EditChallengeForm />
        </Stack>
      </Card>
    </Stack>
  );
};
