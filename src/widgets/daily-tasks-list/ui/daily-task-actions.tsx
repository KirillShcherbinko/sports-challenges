'use client';

import { Group } from '@mantine/core';
import { OpenEditModal } from '@/features/open-edit-modal';
import { OpenDeleteModal } from '@/features/open-delete-modal';
import { EditDailyTaskModalContent } from './edit-daily-task-modal-content';
import { DeleteDailyTaskModalContent } from './delete-daily-task-modal-content';

type TDailyTaskActionsProps = {
  dayNumber: number;
  title: string;
  description: string;
  exerciseType: string;
};

export const DailyTaskActions = ({ dayNumber, title, description, exerciseType }: TDailyTaskActionsProps) => {
  return (
    <Group gap="xs">
      <OpenEditModal
        modalContent={() => (
          <EditDailyTaskModalContent
            dayNumber={dayNumber}
            initialData={{ title, description, exerciseType: exerciseType as any }}
          />
        )}
      />
      <OpenDeleteModal
        modalContent={({ close }) => (
          <DeleteDailyTaskModalContent dayNumber={dayNumber} onClose={close} />
        )}
      />
    </Group>
  );
};
