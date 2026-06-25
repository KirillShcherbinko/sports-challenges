'use client';

import { EditDailyTaskForm } from '@/features/edit-daily-task-form';
import type { TEditDailyTaskDto } from '@/entities/daily-task';

type TEditDailyTaskModalContentProps = {
  dayNumber: number;
  initialData: TEditDailyTaskDto;
};

export const EditDailyTaskModalContent = ({ dayNumber, initialData }: TEditDailyTaskModalContentProps) => {
  return <EditDailyTaskForm dayNumber={dayNumber} initialData={initialData} />;
};
