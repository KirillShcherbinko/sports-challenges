'use server';

import { mapSignInErrors, signInSchema } from '@/entities/auth';
import type { TSignInSchema } from '@/entities/auth';
import { EActionStatus, type TFormActionState } from '@/shared';
import { createServer } from '@/shared/lib/supabase/server';

export const signInAction = async (formValues: TSignInSchema): Promise<TFormActionState<TSignInSchema>> => {
  const validatedData = signInSchema.safeParse(formValues);
  if (!validatedData.success) {
    return {
      status: EActionStatus.Error,
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
      status: EActionStatus.Error,
      errors: mappedError || { root: 'Ошибка атворизации' },
    };
  }

  return { status: EActionStatus.Success, redirect: '/' };
};
