'use server';

import { actionClient } from '@/shared/actions';
import { editProfileSchema } from '@/entities/profile';
import { profileRepository } from '@/entities/profile/server';
import { ERoutes } from '@/shared';
import { revalidatePath } from 'next/cache';
import { createServer } from '@/shared/server';
import { uploadAvatar } from './upload-avatar';
import type { ProfileUpdateInput } from '@/shared/types';
import { getUser } from '@/entities/auth/server';
import { redirect } from 'next/navigation';

export const updateProfileAction = actionClient.inputSchema(editProfileSchema).action(async ({ parsedInput }) => {
  const supabase = await createServer();
  const user = await getUser(supabase);

  const { username, bio, fitnessLevel, preferences, avatar } = parsedInput;
  const updatedData: ProfileUpdateInput = { username, bio, fitnessLevel, preferences };

  if (avatar && avatar.size > 0) {
    const { avatarUrl, avatarPath } = await uploadAvatar({ supabase, avatar, userId: user.id });
    updatedData.avatarUrl = avatarUrl;
    updatedData.avatarPath = avatarPath;
  }

  await profileRepository.updateProfile(user.id, updatedData);

  revalidatePath(ERoutes.PROFILE);
  revalidatePath(ERoutes.PROFILE_EDIT);
  revalidatePath(ERoutes.CREATORS);

  redirect(ERoutes.PROFILE);
});
