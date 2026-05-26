'use server';

import { usernameSchema } from '@/entities/profile';
import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { cacheLife, cacheTag } from 'next/cache';

const getUserCachedProfile = async (username: string) => {
  'use cache';
  cacheTag(`creator ${username}`);
  cacheLife('hours');

  return await profileRepository.getProfileByUsername(username);
};

export const getUserProfileAction = actionClient.inputSchema(usernameSchema).action(async ({ parsedInput: username }) => {
  return await getUserCachedProfile(username);
});
