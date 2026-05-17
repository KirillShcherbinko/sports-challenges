import type { AuthError } from '@supabase/supabase-js';
import { EErrorCode, type TErrorFields } from '@/shared';
import type { TSignInSchema } from '../model/types';

export const mapSignInErrors = (error: AuthError | null): TErrorFields<TSignInSchema> | null => {
  if (!error) return null;

  switch (error.code) {
    case EErrorCode.InvalidCredentials:
      return {
        root: 'Неверный email или пароль',
      };

    default:
      return {
        root: 'Ошибка авторизации',
      };
  }
};
