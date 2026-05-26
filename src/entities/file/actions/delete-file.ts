'use server';

import type { TDeleteFileRequest } from '../model/types';

export const deleteFile = async ({ supabase, bucketName, filePath }: TDeleteFileRequest): Promise<boolean> => {
  const { data, error } = await supabase.storage.from(bucketName).remove([filePath]);

  if (error) return false;

  return data ? data.length > 0 : false;
};
