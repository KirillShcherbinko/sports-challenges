'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { DeleteChallengeButton } from '@/features/delete-challenge-button';

type TDeleteChallengeModalContentProps = {
  onClose: () => void;
};

export const DeleteChallengeModalContent = ({ onClose }: TDeleteChallengeModalContentProps) => {
  return (
    <Stack gap="md">
      <Text>Вы точно хотите удалить этот челлендж?</Text>
      <Group justify="flex-end">
        <Button variant="subtle" onClick={onClose}>
          Отмена
        </Button>
        <DeleteChallengeButton />
      </Group>
    </Stack>
  );
};
