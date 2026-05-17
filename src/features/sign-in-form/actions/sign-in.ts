'use server';

import { mapSignInErrors, signInSchema } from '@/entities/auth';
import type { TSignInSchema } from '@/entities/auth';
import { createServer, EFormActionStatus, type TActionState } from '@/shared';

export const signInAction = async (formValues: TSignInSchema): Promise<TActionState<TSignInSchema>> => {
  const validatedData = signInSchema.safeParse(formValues);
  if (!validatedData.success) {
    return {
      status: EFormActionStatus.Error,
      errors: { root: 'Некорректные данные формы' },
    };
  }

  const supabase = await createServer();

  const { error } = await supabase.auth.signInWithPassword({
    email: validatedData.data.email,
    password: validatedData.data.password,
  });

  const mappedError = mapSignInErrors(error);
  if (mappedError) {
    return {
      status: EFormActionStatus.Error,
      errors: mappedError || { root: 'Ошибка атворизации' },
    };
  }

  return { status: EFormActionStatus.Success, redirect: '/' };
};
