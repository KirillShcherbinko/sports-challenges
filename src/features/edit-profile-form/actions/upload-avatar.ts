'use server';

import { profileRepository } from '@/entities/profile/server';
import type { TUploadAvatarRequest, TUploadAvatarResponse } from '../model/types';
import { EBuckets } from '@/shared';
import { uploadFile } from '@/entities/file/server';

export const uploadAvatar = async ({
  supabase,
  avatar,
  userId,
}: TUploadAvatarRequest): Promise<TUploadAvatarResponse> => {
  const { data } = await profileRepository.getProfileById(userId);

  const fileExt = avatar.name.split('.').pop() || 'png';
  const fileName = data?.avatarPath ? data.avatarPath : crypto.randomUUID();
  const filePath = `${userId}/${fileName}.${fileExt}`;

  const { success, publicUrl, currentFilePath } = await uploadFile({
    supabase,
    bucketName: EBuckets.AVATARS_BUCKET,
    file: avatar,
    filePath,
    upsert: filePath === data?.avatarPath,
  });

  if (!success) {
    throw new Error('Не удалось загрузить аватар пользователя');
  }

  if (!publicUrl || !currentFilePath) {
    throw new Error('Не удалось получить ссылку на аватар');
  }

  return { avatarUrl: publicUrl, avatarPath: currentFilePath };
};
