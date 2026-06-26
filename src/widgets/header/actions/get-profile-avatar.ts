'use server';

import { getUser } from '@/entities/auth/server';
import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';

export const getProfileAvatarAction = actionClient.action(async () => {
  try {
    const supabase = await createServer();
    const { id } = await getUser(supabase);
    const avatarUrl = await profileRepository.getProfileAvatar(id);
    return { avatarUrl, isAuthenticated: true };
  } catch {
    return { avatarUrl: null, isAuthenticated: false };
  }
});
