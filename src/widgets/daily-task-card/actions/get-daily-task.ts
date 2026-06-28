'use server';

import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { dailyTaskRepository } from '@/entities/daily-task/server';
import { profileChallengeRepository } from '@/entities/profile-challenge/server';
import type { TDailyTaskDto } from '@/entities/daily-task';
import { getUser } from '@/entities/auth/server';
import { createServer } from '@/shared/server';
import { retryResult } from '@/shared';
import { z } from 'zod';

const schema = z.object({
  challengeId: z.string(),
});

const getCachedDailyTask = async (challengeId: string, dayNumber: number): Promise<TDailyTaskDto | null> => {
  'use cache';
  cacheTag(`daily_task_${challengeId}_${dayNumber}`);
  cacheLife('hours');

  return await retryResult(() => dailyTaskRepository.getDailyTaskByDayNumber(challengeId, dayNumber));
};

export const getDailyTaskAction = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput: { challengeId } }): Promise<TDailyTaskDto | null> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    const profileChallenge = await profileChallengeRepository.getProfileChallengeById(challengeId, user.id);
    if (!profileChallenge) {
      return null;
    }

    return await getCachedDailyTask(challengeId, profileChallenge.currentDay);
  });
