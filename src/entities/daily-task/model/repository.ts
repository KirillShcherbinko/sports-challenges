import { prisma } from '@/shared/server';
import { mapToDailyTaskDto, mapToDailyTaskMutationDto } from '../lib/mappers';
import type { TDailyTaskDto, TDailyTaskMutationDto } from './dtos';
import type { DailyTaskCreateInput, DailyTaskUpdateInput } from '@/shared/types';

class DailyTaskRepository {
  async getDailyTasks(challengeId: string): Promise<TDailyTaskDto[]> {
    const dailyTasks = await prisma.dailyTask.findMany({ where: { challengeId } });
    return dailyTasks.map(mapToDailyTaskDto);
  }

  async createDailyTask(data: DailyTaskCreateInput): Promise<TDailyTaskMutationDto> {
    const dailyTask = await prisma.dailyTask.create({ data });
    return mapToDailyTaskMutationDto(dailyTask);
  }

  async getCurrentDailyTask(challengeId: string, dayNumber: number): Promise<TDailyTaskDto | null> {
    const dailyTask = await prisma.dailyTask.findUnique({
      where: { challengeId_dayNumber: { challengeId, dayNumber } },
    });

    return dailyTask ? mapToDailyTaskDto(dailyTask) : null;
  }

  async updateDailyTask(challengeId: string, dayNumber: number, data: DailyTaskUpdateInput) {
    const dailyTask = await prisma.dailyTask.update({
      where: { challengeId_dayNumber: { challengeId, dayNumber } },
      data,
    });

    return mapToDailyTaskMutationDto(dailyTask);
  }

  async deleteDailyTask(challengeId: string, dayNumber: number) {
    const dailyTask = await prisma.dailyTask.delete({ where: { challengeId_dayNumber: { challengeId, dayNumber } } });
    return mapToDailyTaskMutationDto(dailyTask);
  }
}

export const dailyTaskRepository = new DailyTaskRepository();
