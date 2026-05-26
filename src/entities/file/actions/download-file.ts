'use server';

import type { TDownloadFileRequest } from '../model/types';

export const downloadFile = async ({ supabase, bucketName, filePath }: TDownloadFileRequest): Promise<File | null> => {
  const { data: blob, error } = await supabase.storage.from(bucketName).download(filePath);

  if (error) {
    throw new Error(`Ошибка скачивания: ${error}`);
  }

  if (!blob || blob.size < 0) {
    return null;
  }

  return new File([blob], filePath, { type: blob.type });
};
