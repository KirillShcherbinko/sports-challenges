import type { DailyTask } from '@/shared/client';
import type { TDailyTaskDto, TDailyTaskMutationDto } from '../model/dtos';

export const mapToDailyTaskDto = (data: DailyTask): TDailyTaskDto => {
  return {
    id: `${data.challengeId}-${data.dayNumber}`,
    title: data.title,
    description: data.description,
    exerciseType: data.exerciseType,
    dayNumber: data.dayNumber,
  };
};

export const mapToDailyTaskMutationDto = (data: DailyTask): TDailyTaskMutationDto => {
  return {
    id: `${data.challengeId}-${data.dayNumber}`,
    title: data.title,
    dayNumber: data.dayNumber,
  };
};
