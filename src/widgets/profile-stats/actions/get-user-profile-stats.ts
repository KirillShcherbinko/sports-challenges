'use server';

import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { cacheLife, cacheTag } from 'next/cache';
import { retryResult } from '@/shared';
import { usernameSchema } from '@/entities/profile';
import type { TProfileAnalyticsDto } from '@/entities/profile';

const getCachedUserProfileStats = async (username: string): Promise<TProfileAnalyticsDto | null> => {
  'use cache';
  cacheTag(`profile_stats_${username}`);
  cacheLife('hours');

  const profile = await profileRepository.getProfileByUsername(username);
  if (!profile) return null;

  return await retryResult(() => profileRepository.getProfileAnalytics(profile.id));
};

export const getUserProfileStatsAction = actionClient
  .inputSchema(usernameSchema)
  .action(async ({ parsedInput: username }): Promise<TProfileAnalyticsDto | null> => {
    return await getCachedUserProfileStats(username);
  });
