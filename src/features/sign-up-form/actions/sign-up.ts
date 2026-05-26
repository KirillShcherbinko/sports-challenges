'use server';

import { signUpSchema } from '@/entities/auth';
import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';

export const signUpAction = actionClient.inputSchema(signUpSchema).action(async ({ parsedInput }) => {
  const { username, email, password } = parsedInput;

  const isUsernameExist = await profileRepository.getProfileByUsername(username);
  if (isUsernameExist) {
    throw new Error('Пользователь с таким именем уже существует');
  }

  const supabase = await createServer();

  const { data, error: authError } = await supabase.auth.signUp({ email, password });
  if (authError) {
    if (authError.code === 'user_already_exists') {
      throw new Error('Пользователь уже существует в системе');
    }
    throw new Error('Ошибка регистрации');
  }

  if (!data.user) {
    throw new Error('Не удалось создать пользователя');
  }

  await profileRepository.createProfile({ id: data.user.id, username });
});
