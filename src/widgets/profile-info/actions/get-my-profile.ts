'use server';

import { getUser } from '@/entities/auth/server';
import { profileRepository } from '@/entities/profile/server';
import { retryResult } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { cacheLife, cacheTag } from 'next/cache';

const getMyCachedProfile = async (userId: string) => {
  'use cache';
  cacheTag('profile');
  cacheLife('hours');

  return retryResult(async () => await profileRepository.getProfileById(userId));
};

export const getMyProfileAction = actionClient.action(async () => {
  const supabase = await createServer();
  const { id } = await getUser(supabase);

  return await getMyCachedProfile(id);
})