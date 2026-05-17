'use server';

import { signInSchema } from '@/entities/auth';
import type { TSignInSchema } from '@/entities/auth';
import { redirect } from 'next/navigation';
import { createServer } from '@/shared';

export const signInAction = async (formValues: TSignInSchema): Promise<void> => {
  const validatedData = signInSchema.parse(formValues);

  const supabase = await createServer();

  const { error } = await supabase.auth.signInWithPassword({
    email: validatedData.email,
    password: validatedData.password,
  });

  if (error) {
    throw new Error('Неверный email или пароль');
  }

  redirect('/');
};
