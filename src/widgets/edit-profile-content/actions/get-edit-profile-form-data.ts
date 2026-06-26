'use server';

import { getUser } from '@/entities/auth/server';
import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { cacheTag, cacheLife } from 'next/cache';
import type { TEditProfileDto } from '@/entities/profile';
import { retryResult } from '@/shared';

const getCachedProfileData = async (userId: string): Promise<TEditProfileDto> => {
  'use cache';
  cacheTag('profile edit');
  cacheLife('hours');

  const profile = await retryResult(() => profileRepository.getEditProfileById(userId));

  if (!profile) {
    throw new Error('Профиль пользователя не найден');
  }

  return {
    id: profile.id,
    username: profile.username,
    bio: profile.bio,
    fitnessLevel: profile.fitnessLevel,
    preferences: profile.preferences ?? [],
    avatarUrl: profile.avatarUrl,
    avatarPath: profile.avatarPath,
  };
};

export const getEditProfileFormDataAction = actionClient.action(async (): Promise<TEditProfileDto> => {
  const supabase = await createServer();
  const user = await getUser(supabase);

  return await getCachedProfileData(user.id);
});
