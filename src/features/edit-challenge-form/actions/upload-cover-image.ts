'use server';

import { challengeRepository } from '@/entities/challenge/server';
import type { TUploadCoverImageRequest, TUploadCoverImageResponse } from '../model/types';
import { EBuckets } from '@/shared';
import { uploadFile } from '@/entities/file/server';

export const uploadCoverImage = async ({
  supabase,
  coverImage,
  challengeId,
}: TUploadCoverImageRequest): Promise<TUploadCoverImageResponse> => {
  const data = await challengeRepository.getEditChallengeById(challengeId);

  const fileExt = coverImage.name.split('.').pop() || 'png';
  const filePath = data?.coverImagePath ? data.coverImagePath : `${challengeId}/${crypto.randomUUID()}.${fileExt}`;

  const { success, publicUrl, currentFilePath } = await uploadFile({
    supabase,
    bucketName: EBuckets.CHALLENGES_BUCKET,
    file: coverImage,
    filePath,
    upsert: filePath === data?.coverImagePath,
  });

  if (!success) {
    throw new Error('Не удалось загрузить аватар пользователя');
  }

  if (!publicUrl || !currentFilePath) {
    throw new Error('Не удалось получить ссылку на аватар');
  }

  return { coverImageUrl: publicUrl, coverImagePath: currentFilePath };
};
