import type { AuthError } from '@supabase/supabase-js';
import type { TErrorFields } from '@/shared';

export const mapSignOutErrors = (
  error: AuthError | null
): TErrorFields<Record<string, never>> | null => {
  if (!error) return null;

  return {
    root: 'Ошибка выхода из аккаунта',
  };
};