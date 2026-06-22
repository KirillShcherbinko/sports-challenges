'use server';

import { getUser } from '@/entities/auth/server';
import { challengeExistsAndNotPublished } from '@/entities/challenge/server';
import { challengeIdAndDayNumberSchema, type TDailyTaskMutationDto } from '@/entities/daily-task';
import { dailyTaskRepository } from '@/entities/daily-task/server';
import { ERoutes } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const deleteDailyTaskAction = actionClient
  .inputSchema(challengeIdAndDayNumberSchema)
  .action(async ({ parsedInput }): Promise<TDailyTaskMutationDto> => {
    const supabase = await createServer();
    await getUser(supabase);

    const { challengeId, dayNumber } = parsedInput;

    await challengeExistsAndNotPublished(challengeId);

    const dailyTask = await dailyTaskRepository.deleteDailyTask(challengeId, dayNumber);

    revalidatePath(ERoutes.MY_CHALLENGES);

    return dailyTask;
  });
