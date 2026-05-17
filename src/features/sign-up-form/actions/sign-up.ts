'use server';

import { mapSignUpErrors, signUpSchema } from '@/entities/auth';
import type { TSignUpSchema } from '@/entities/auth';
import { profileRepository } from '@/entities/profile';
import { createServer, EFormActionStatus, type TActionState } from '@/shared';

export const signUpAction = async (formValues: TSignUpSchema): Promise<TActionState<TSignUpSchema>> => {
  // Серверная валидация
  const validatedData = signUpSchema.safeParse(formValues);
  if (!validatedData.success) {
    return {
      status: EFormActionStatus.Error,
      errors: { root: 'Некорректные данные формы' },
    };
  }

  // Проверка на уникальность имени пользователя
  const isExistingUsername = await profileRepository.getProfileByUsername(validatedData.data.username);
  if (isExistingUsername.success) {
    return {
      status: EFormActionStatus.Error,
      errors: { fields: [{ field: 'username', message: 'Пользователь с таким именем уже существует' }] },
    };
  }

  // Регистрация пользователя
  const supabase = await createServer();
  const { data, error } = await supabase.auth.signUp({
    email: validatedData.data.email,
    password: validatedData.data.password,
  });

  // Обработка ошибок после регистрации
  const mappedError = mapSignUpErrors(error);
  if (mappedError) {
    return {
      status: EFormActionStatus.Error,
      errors: mappedError,
    };
  }

  // Обработска ошибок, если пользователь не создан
  if (!data.user) {
    return {
      status: EFormActionStatus.Error,
      errors: { root: 'Пользователь не создан' },
    };
  }

  // Создание профиля пользователя
  const profileData = await profileRepository.createProfile({
    id: data.user.id,
    username: validatedData.data.username,
  });

  // Проверка ошибок после создания профиля
  if (!profileData.success) {
    return {
      status: EFormActionStatus.Error,
      errors: { root: profileData.error },
    };
  }

  return { status: EFormActionStatus.Success, redirect: '/profile' };
};
