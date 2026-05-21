'use server';

import { actionClient } from '@/shared/actions';
import { editProfileSchema, type TEditProfileSchema } from '@/entities/profile';
import { profileRepository } from '@/entities/profile/server';
import { ERoutes, type TResult } from '@/shared';
import { revalidatePath } from 'next/cache';
import { createServer } from '@/shared/server';
import { uploadAvatar } from './upload-avatar';
import type { ProfileUpdateInput } from '@/shared/types';
import { getUser } from '@/entities/auth/server';

export const updateProfileAction = actionClient
  .inputSchema(editProfileSchema)
  .action(async ({ parsedInput }): Promise<TResult<TEditProfileSchema>> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    const { username, bio, fitnessLevel, avatar } = parsedInput;
    const updatedData: ProfileUpdateInput = { username, bio, fitnessLevel };

    if (avatar && avatar.size > 0) {
      const { avatarUrl, avatarPath } = await uploadAvatar({ supabase, avatar, userId: user.id });
      updatedData.avatarUrl = avatarUrl;
      updatedData.avatarPath = avatarPath;
    }

    const result = await profileRepository.updateProfile(user.id, updatedData);

    if (!result.success) {
      throw new Error(result.error ?? 'Не удалось обновить данные');
    }

    revalidatePath(ERoutes.PROFILE);
    revalidatePath(ERoutes.PROFILE_EDIT);
    revalidatePath(ERoutes.DISCOVER);

    return {
      success: true,
      redirect: ERoutes.PROFILE,
    };
  });
