'use server';

import { actionClient } from '@/shared/actions';
import { editProfileSchema, type TEditProfileSchema } from '@/entities/profile';
import { profileRepository } from '@/entities/profile/server';
import { EBuckets, ERoutes, type TResult } from '@/shared';
import { revalidatePath } from 'next/cache';
import { createServer } from '@/shared/server';

const { randomUUID } = await import('node:crypto');

export const updateProfileAction = actionClient
  .inputSchema(editProfileSchema)
  .action(async ({ parsedInput }): Promise<TResult<TEditProfileSchema>> => {
    const supabase = await createServer();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    let avatarUrl: string | undefined;

    if (parsedInput.avatar instanceof File) {
      const fileExt = parsedInput.avatar.name.split('.').pop();
      const filePath = `${user.id}/${randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage.from(EBuckets.AVATARS_BUCKET).upload(filePath, parsedInput.avatar);

      if (error) {
        console.error(error);
        throw new Error('Не удалось загрузить файл');
      }

      const { data } = supabase.storage.from(EBuckets.AVATARS_BUCKET).getPublicUrl(filePath);

      avatarUrl = data.publicUrl;
    }

    const result = await profileRepository.updateProfile(user.id, {
      username: parsedInput.username,
      bio: parsedInput.bio,
      fitnessLevel: parsedInput.fitnessLevel,
      ...(avatarUrl && { avatarUrl }),
    });

    if (!result.success) {
      throw new Error(result.error ?? 'Не удалось обновить данные');
    }

    revalidatePath('/profile');
    revalidatePath('/profile/edit');
    revalidatePath('/discover/creators');

    return {
      success: true,
      redirect: ERoutes.PROFILE,
    };
  });
