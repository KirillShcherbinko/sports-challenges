'use server';

import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { cacheLife, cacheTag } from 'next/cache';
import { retryResult } from '@/shared';
import { z } from 'zod';
import type { TCreatorAnalyticsDto } from '@/entities/profile';

const getCreatorStatsSchema = z.object({
  username: z.string(),
});

const getCachedCreatorStats = async (username: string): Promise<TCreatorAnalyticsDto> => {
  'use cache';
  cacheTag(`creator_stats_${username}`);
  cacheLife('hours');

  return await retryResult(() => profileRepository.getCreatorAnalytics(username));
};

export const getCreatorStatsAction = actionClient
  .inputSchema(getCreatorStatsSchema)
  .action(async ({ parsedInput: { username } }): Promise<TCreatorAnalyticsDto> => {
    return await getCachedCreatorStats(username);
  });
