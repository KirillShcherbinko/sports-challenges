import type { SupabaseClient } from '@supabase/supabase-js';

export type TUploadCoverImageRequest = {
  supabase: SupabaseClient;
  coverImage: File;
  challengeId: string;
};

export type TUploadCoverImageResponse = {
  coverImageUrl: string;
  coverImagePath: string;
};
