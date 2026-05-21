import type { SupabaseClient } from '@supabase/supabase-js';

export type TUploadAvatarRequest = {
  supabase: SupabaseClient;
  avatar: File;
  userId: string;
};

export type TUploadAvatarResponse = {
  avatarUrl: string;
  avatarPath: string;
};
