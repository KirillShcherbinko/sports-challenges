'use server';

import { createServer } from '@/shared/server';
import { EActionStatus, type TErrorFields, type TFormActionState } from '@/shared';
import { mapSignOutErrors } from '@/entities/auth';

export const signOutAction = async (): Promise<TFormActionState<Record<string, never>>> => {
  const supabase = await createServer();

  const { error } = await supabase.auth.signOut();
  const mappedError = mapSignOutErrors(error);
  if (mappedError) {
    return {
      status: EActionStatus.Error,
      errors: mappedError as TErrorFields<Record<string, never>>,
    };
  }

  return { status: EActionStatus.Success, redirect: '/sign-in' };
};
