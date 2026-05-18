import type { AuthError } from '@supabase/supabase-js';
import { EErrorCode, type TErrorFields } from '@/shared';
import type { TSignUpSchema } from '../model/types';

export const mapSignUpErrors = (error: AuthError | null): TErrorFields<TSignUpSchema> | null => {
  if (!error) return null;

  switch (error.code) {
    case EErrorCode.UserAlreadyExists:
      return {
        fields: [
          {
            field: 'email',
            message: 'Пользователь с таким email уже существует',
          },
        ],
      };

    case EErrorCode.WeakPassword:
      return {
        fields: [
          {
            field: 'password',
            message: 'Пароль слишком слабый',
          },
        ],
      };

    default:
      return {
        root: 'Ошибка регистрации',
      };
  }
};
