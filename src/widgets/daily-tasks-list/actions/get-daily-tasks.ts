'use server';

import { idSchema, retryResult } from '@/shared';
import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { dailyTaskRepository } from '@/entities/daily-task/server';
import type { TDailyTaskDto } from '@/entities/daily-task';

const getCachedDailyTasks = async (challengeId: string): Promise<TDailyTaskDto[]> => {
  'use cache';
  cacheTag(`daily_tasks_${challengeId}`);
  cacheLife('hours');

  return await retryResult(() => dailyTaskRepository.getDailyTasks(challengeId));
};

export const getDailyTasksAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<TDailyTaskDto[]> => {
    return await getCachedDailyTasks(challengeId);
  });
