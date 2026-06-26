import type { TTaskCompletionDto, TTaskCompletionMutationDto } from '../model/dtos';
import type { TTaskCompletionWithDailyTask } from '../model/types';

export const mapToTaskCompletionDto = (data: TTaskCompletionWithDailyTask): TTaskCompletionDto => {
  return {
    id: `${data.challengeId}_${data.profileId}_${data.dayNumber}`,
    isCompleted: data.isCompleted,
    completedAt: data.completedAt,
    dailyTask: {
      title: data.dailyTask.title,
      dayNumber: data.dailyTask.dayNumber,
    },
  };
};

export const mapToTaskCompletionMutationDto = (data: TTaskCompletionWithDailyTask): TTaskCompletionMutationDto => {
  return {
    id: `${data.challengeId}_${data.profileId}_${data.dayNumber}`,
    dailyTask: {
      title: data.dailyTask.title,
      dayNumber: data.dailyTask.dayNumber,
    },
  };
};
