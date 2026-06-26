'use server';

import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { dailyTaskRepository } from '@/entities/daily-task/server';
import { challengeIdAndDayNumberSchema } from '@/entities/daily-task';
import type { TEditDailyTaskDto } from '@/entities/daily-task';
import { retryResult } from '@/shared';

const getCachedDailyTaskData = async (
  challengeId: string,
  dayNumber: number
): Promise<TEditDailyTaskDto> => {
  'use cache';
  cacheTag(`daily task edit ${challengeId}_${dayNumber}`);
  cacheLife('hours');

  const dailyTask = await retryResult(() =>
    dailyTaskRepository.getDailyTaskByDayNumber(challengeId, dayNumber)
  );

  if (!dailyTask) {
    throw new Error('Задание не найдено');
  }

  return {
    title: dailyTask.title,
    description: dailyTask.description,
    exerciseType: dailyTask.exerciseType,
  };
};

export const getEditDailyTaskFormDataAction = actionClient
  .inputSchema(challengeIdAndDayNumberSchema)
  .action(async ({ parsedInput }): Promise<TEditDailyTaskDto> => {
    return await getCachedDailyTaskData(parsedInput.challengeId, parsedInput.dayNumber);
  });
