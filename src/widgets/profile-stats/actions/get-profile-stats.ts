'use server';

import { getUser } from '@/entities/auth/server';
import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { cacheLife, cacheTag } from 'next/cache';
import { retryResult } from '@/shared';
import type { TProfileAnalyticsDto } from '@/entities/profile';

const getCachedProfileStats = async (profileId: string): Promise<TProfileAnalyticsDto> => {
  'use cache';
  cacheTag(`profile_stats_${profileId}`);
  cacheLife('hours');

  return await retryResult(() => profileRepository.getProfileAnalytics(profileId));
};

export const getProfileStatsAction = actionClient.action(async () => {
  const supabase = await createServer();
  const { id } = await getUser(supabase);

  return await getCachedProfileStats(id);
});
