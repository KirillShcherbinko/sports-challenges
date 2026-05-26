'use server';

import { signInSchema } from '@/entities/auth';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';

export const signInAction = actionClient.inputSchema(signInSchema).action(async ({ parsedInput }) => {
  const supabase = await createServer();
  const { email, password } = parsedInput;

  await supabase.auth.signInWithPassword({ email, password });
});
