'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SIGN_IN_DATA } from '../config/sign-in-data';
import type { TSignInSchema } from '@/entities/auth';
import { Stack, TextInput, PasswordInput, Button } from '@mantine/core';
import { signInAction } from '../actions/sign-in';
import { notifications } from '@mantine/notifications';

export const SignInForm = () => {
  const { schema, defaultValues, fields } = SIGN_IN_DATA;

  const [isPending, startTransition] = useTransition();

  const { formState, handleSubmit, register } = useForm<TSignInSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formValues: TSignInSchema) => {
    startTransition(async () => {
      const { serverError } = await signInAction(formValues);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }
    });
  };

  return (
    <Stack component="form" gap="sm" onSubmit={handleSubmit(onSubmit)}>
      <TextInput error={formState.errors.email?.message} {...fields.email} {...register('email')} />
      <PasswordInput error={formState.errors.password?.message} {...fields.password} {...register('password')} />
      <Button type="submit" loading={formState.isSubmitting || isPending}>
        Войти
      </Button>
    </Stack>
  );
};
