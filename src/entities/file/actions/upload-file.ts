'use server';

import type { TUploadFileRequest, TUploadFileResponse } from '../model/types';

export const uploadFile = async ({
  supabase,
  bucketName,
  file,
  filePath,
  upsert = true,
}: TUploadFileRequest): Promise<TUploadFileResponse> => {
  const { error } = await supabase.storage.from(bucketName).upload(filePath, file, { upsert });

  if (error) {
    return { success: false };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  return { success: true, currentFilePath: filePath, publicUrl };
};
