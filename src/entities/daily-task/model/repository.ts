import { prisma } from '@/shared/server';
import { mapToDailyTaskDto, mapToDailyTaskMutationDto } from '../lib/mappers';
import type { TDailyTaskDto, TDailyTaskMutationDto } from './dtos';
import type { DailyTaskCreateInput, DailyTaskUpdateInput } from '@/shared/types';

class DailyTaskRepository {
  async getDailyTasks(challengeId: string): Promise<TDailyTaskDto[]> {
    const dailyTasks = await prisma.dailyTask.findMany({ where: { challengeId } });
    return dailyTasks.map(mapToDailyTaskDto);
  }

  async countDailyTasks(challengeId: string): Promise<number> {
    return await prisma.dailyTask.count({ where: { challengeId } });
  }

  async createDailyTask(data: DailyTaskCreateInput): Promise<TDailyTaskMutationDto> {
    const dailyTask = await prisma.dailyTask.create({ data });
    return mapToDailyTaskMutationDto(dailyTask);
  }

  async getDailyTaskByDayNumber(challengeId: string, dayNumber: number): Promise<TDailyTaskDto | null> {
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
    const dailyTask = await prisma.$transaction(async (tx) => {
      const task = await tx.dailyTask.findUnique({
        where: { challengeId_dayNumber: { challengeId, dayNumber } },
        select: { challengeId: true, dayNumber: true },
      });

      if (!task) {
        throw new Error('DailyTask not found');
      }

      const result = await tx.dailyTask.delete({
        where: { challengeId_dayNumber: { challengeId, dayNumber } },
      });

      await tx.dailyTask.updateMany({
        where: { challengeId: task.challengeId, dayNumber: { gt: task.dayNumber } },
        data: { dayNumber: { decrement: 1 } },
      });

      return result;
    });

    return mapToDailyTaskMutationDto(dailyTask);
  }
}

export const dailyTaskRepository = new DailyTaskRepository();
