import { EditChallengeForm } from '@/features/edit-challenge-form';
import { Card, Stack, Title } from '@mantine/core';

export const CreateChallengePage = () => {
  return (
    <Stack maw={700} w="100%" p={24} align="center">
      <Card w="100%">
        <Stack gap="xl" w="100%" align="center">
          <Title ta="center">Создать челлендж</Title>
          <EditChallengeForm />
        </Stack>
      </Card>
    </Stack>
  );
};
