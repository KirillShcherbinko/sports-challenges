import { prisma } from '@/shared/server';
import type { TTaskCompletionWithDailyTask } from './types';
import { mapToTaskCompletionDto, mapToTaskCompletionMutationDto } from '../lib/mappers';
import type { TTaskCompletionDto, TTaskCompletionMutationDto } from './dtos';

class TaskCompletionRepository {
  async getTaskCompletionHistory(challengeId: string, profileId: string): Promise<TTaskCompletionDto[]> {
    const taskCompletions: TTaskCompletionWithDailyTask[] = await prisma.taskCompletion.findMany({
      where: { challengeId, profileId },
      include: { dailyTask: true },
    });

    return taskCompletions.map(mapToTaskCompletionDto);
  }

  async isTaskCompleted(challengeId: string, profileId: string, dayNumber: number): Promise<TTaskCompletionDto | null> {
    const taskCompletion = await prisma.taskCompletion.findUnique({
      where: { profileId_challengeId_dayNumber: { profileId, challengeId, dayNumber } },
      include: { dailyTask: true },
    });

    return taskCompletion ? mapToTaskCompletionDto(taskCompletion) : null;
  }

  async completeTask(challengeId: string, profileId: string, dayNumber: number): Promise<TTaskCompletionMutationDto> {
    const taskCompletion = await prisma.taskCompletion.update({
      where: { profileId_challengeId_dayNumber: { profileId, challengeId, dayNumber } },
      data: {
        isCompleted: true,
        completedAt: new Date(),
      },
      include: { dailyTask: true },
    });

    return mapToTaskCompletionMutationDto(taskCompletion);
  }

  async skipTask(challengeId: string, profileId: string, dayNumber: number): Promise<TTaskCompletionMutationDto> {
    const taskCompletion = await prisma.taskCompletion.update({
      where: { profileId_challengeId_dayNumber: { profileId, challengeId, dayNumber } },
      data: {
        isCompleted: false,
      },
      include: { dailyTask: true },
    });

    return mapToTaskCompletionMutationDto(taskCompletion);
  }
}

export const taskCompletionRepository = new TaskCompletionRepository();
