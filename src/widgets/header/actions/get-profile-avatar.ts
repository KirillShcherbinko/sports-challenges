'use server';

import { getUser } from '@/entities/auth/server';
import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { cacheLife, cacheTag } from 'next/cache';

const getCachedAvatar = async (userId: string) => {
  'use cache';
  cacheTag('profile');
  cacheLife('hours');

  return profileRepository.getProfileAvatar(userId);
};

export const getProfileAvatarAction = actionClient.action(async () => {
  try {
    const supabase = await createServer();
    const { id } = await getUser(supabase);
    const avatarUrl = await getCachedAvatar(id);
    return { avatarUrl, isAuthenticated: true };
  } catch {
    return { avatarUrl: null, isAuthenticated: false };
  }
});
