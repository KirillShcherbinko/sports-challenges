'use server';

import type { AuthError } from '@supabase/supabase-js';
import { EActionStatus, type TErrorFields, type TFormActionState } from '@/shared';
import { createServer } from '@/shared/server';

const mapSignOutErrors = (error: AuthError | null): TErrorFields<Record<string, never>> | null => {
  if (!error) return null;

  return {
    root: 'Ошибка выхода из аккаунта',
  };
};

export const signOutAction = async (): Promise<TFormActionState<Record<string, never>>> => {
  const supabase = await createServer();

  const { error } = await supabase.auth.signOut();

  const mappedError = mapSignOutErrors(error);

  if (mappedError) {
    return {
      status: EActionStatus.Error,
      errors: mappedError,
    };
  }

  return {
    status: EActionStatus.Success,
    redirect: '/sign-in',
  };
};
