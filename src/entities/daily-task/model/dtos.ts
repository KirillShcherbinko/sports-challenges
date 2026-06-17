import type { FitnessCategory } from '@/shared/types';

export type TDailyTaskDto = {
  id: string;
  title: string;
  description: string;
  exerciseType: FitnessCategory;
  dayNumber: number;
};

export type TDailyTaskMutationDto = {
  id: string;
  title: string;
  dayNumber: number;
};
