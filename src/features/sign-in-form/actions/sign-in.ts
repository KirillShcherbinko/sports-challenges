'use server';

import { signInSchema } from '@/entities/auth';
import { ERoutes } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { redirect } from 'next/navigation';

export const signInAction = actionClient.inputSchema(signInSchema).action(async ({ parsedInput }) => {
  const supabase = await createServer();
  const { email, password } = parsedInput;

  const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

  if (authError) {
    if (authError.code === 'invalid_credentials') {
      throw new Error('Неверные данные для входа');
    }
    throw new Error('Не удалось войти в систему');
  }

  redirect(ERoutes.PROFILE);
});
