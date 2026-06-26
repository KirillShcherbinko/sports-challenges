'use server';

import { createServer } from '@/shared/server';
import { actionClient } from '@/shared/actions';
import { redirect } from 'next/navigation';
import { ERoutes } from '@/shared';

export const signOutAction = actionClient.action(async () => {
  const supabase = await createServer();
  const { error: authError } = await supabase.auth.signOut();

  if (authError) {
    throw new Error('Не удалось выйти из системы');
  }

  redirect(ERoutes.SIGN_IN);
});
