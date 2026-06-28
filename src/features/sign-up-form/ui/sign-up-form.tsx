'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SIGN_UP_DATA } from '../config/sign-up-data';
import type { TSignUpSchema } from '@/entities/auth';
import { Stack, TextInput, PasswordInput, Button } from '@mantine/core';
import { signUpAction } from '../actions/sign-up';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';

export const SignUpForm = () => {
  const { schema, defaultValues, fields } = SIGN_UP_DATA;

  const [isPendeing, startTransition] = useTransition();

  const { formState, handleSubmit, register } = useForm<TSignUpSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formValues: TSignUpSchema) => {
    startTransition(async () => {
      const { serverError, validationErrors } = await signUpAction(formValues);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
        return;
      }

      if (validationErrors) {
        notifications.show({ title: 'Ошибка', message: validationErrors._errors?.join('. '), color: 'red' });
        return;
      }
    });
  };

  return (
    <Stack
      gap="lg"
      p="xl"
      bg="var(--mantine-color-dark-8)"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{ borderRadius: 'var(--mantine-radius-lg)', border: '1px solid var(--mantine-color-dark-6)' }}
    >
      <TextInput error={formState.errors.username?.message} {...fields.username} {...register('username')} />
      <TextInput error={formState.errors.email?.message} {...fields.email} {...register('email')} />
      <PasswordInput error={formState.errors.password?.message} {...fields.password} {...register('password')} />
      <Button type="submit" fullWidth loading={formState.isSubmitting || isPendeing}>
        Зарегистрироваться
      </Button>
    </Stack>
  );
};
