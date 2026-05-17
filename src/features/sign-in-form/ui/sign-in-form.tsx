'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SIGN_IN_DATA } from '../config/sign-in-data';
import type { TSignInSchema } from '@/entities/auth';
import { signIn } from '../api/sign-in';
import { Stack, TextInput, PasswordInput, Button } from '@mantine/core';

export const SignInForm = () => {
  const { schema, defaultValues, fields } = SIGN_IN_DATA;

  const { formState, handleSubmit, register } = useForm<TSignInSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formValues: TSignInSchema) => {
    await signIn(formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput error={formState.errors.email?.message} {...fields.email} {...register('email')} />
        <PasswordInput error={formState.errors.password?.message} {...fields.password} {...register('password')} />
        <Button type="submit" loading={formState.isSubmitting}>
          Войти
        </Button>
      </Stack>
    </form>
  );
};
