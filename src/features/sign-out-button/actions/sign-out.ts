'use server';

import { createServer } from '@/shared/server';
import { actionClient } from '@/shared/actions';

export const signOutAction = actionClient.action(async() => {
  const supabase = await createServer();
  await supabase.auth.signOut();
})
