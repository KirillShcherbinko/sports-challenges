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

  async getDailyTaskById(dailyTaskId: string): Promise<TDailyTaskDto | null> {
    const dailyTask = await prisma.dailyTask.findUnique({ where: { id: dailyTaskId } });
    return dailyTask ? mapToDailyTaskDto(dailyTask) : null;
  }

  async updateDailyTask(dailyTaskId: string, data: DailyTaskUpdateInput) {
    const dailyTask = await prisma.dailyTask.update({ where: { id: dailyTaskId }, data });
    return mapToDailyTaskMutationDto(dailyTask);
  }

  async deleteDailyTask(dailyTaskId: string) {
    const dailyTask = await prisma.dailyTask.delete({ where: { id: dailyTaskId } });
    return mapToDailyTaskMutationDto(dailyTask);
  }
}

export const dailyTaskRepository = new DailyTaskRepository();
