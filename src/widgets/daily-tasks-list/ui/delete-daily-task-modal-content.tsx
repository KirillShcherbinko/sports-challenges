'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { DeleteDailyTaskButton } from '@/features/delete-daily-task-button';

type TDeleteDailyTaskModalContentProps = {
  dayNumber: number;
  onClose: () => void;
};

export const DeleteDailyTaskModalContent = ({ dayNumber, onClose }: TDeleteDailyTaskModalContentProps) => {
  return (
    <Stack gap="md">
      <Text>Вы точно хотите удалить это задание?</Text>
      <Group justify="flex-end">
        <Button variant="subtle" onClick={onClose}>
          Отмена
        </Button>
        <DeleteDailyTaskButton dayNumber={dayNumber} />
      </Group>
    </Stack>
  );
};
