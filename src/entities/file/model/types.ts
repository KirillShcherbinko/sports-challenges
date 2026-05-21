import type { EBuckets } from "@/shared";
import type { SupabaseClient } from "@supabase/supabase-js";

export type TFileRequest = {
  supabase: SupabaseClient,
  bucketName: EBuckets;
}

export type TUploadFileRequest = TFileRequest & {
  file: File;
  filePath: string;
  upsert?: boolean;
}

export type TDeleteFileRequest = TFileRequest & {
  filePath: string;
}

export type TUploadFileResponse = {
  success: boolean;
  currentFilePath?: string;
  publicUrl?: string;
}

