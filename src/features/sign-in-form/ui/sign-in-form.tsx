'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SIGN_IN_DATA } from '../config/sign-in-data';
import type { TSignInSchema } from '@/entities/auth';
import { Stack, TextInput, PasswordInput, Button } from '@mantine/core';
import { ERoutes } from '@/shared';
import { signInAction } from '../actions/sign-in';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { notifications } from '@mantine/notifications';

export const SignInForm = () => {
  const { schema, defaultValues, fields } = SIGN_IN_DATA;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { formState, handleSubmit, register } = useForm<TSignInSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formValues: TSignInSchema) => {
    const { serverError, validationErrors } = await signInAction(formValues);

    if (serverError) {
      notifications.show({
        title: 'Ошибка',
        message: serverError,
        color: 'red',
      });

      return;
    }

    if (validationErrors) {
      notifications.show({
        title: 'Ошибка',
        message: validationErrors._errors?.join('. '),
        color: 'red',
      });
    }

    startTransition(() => {
      router.push(ERoutes.PROFILE);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="sm">
        <TextInput error={formState.errors.email?.message} {...fields.email} {...register('email')} />
        <PasswordInput error={formState.errors.password?.message} {...fields.password} {...register('password')} />
        <Button type="submit" loading={formState.isSubmitting || isPending}>
          Войти
        </Button>
      </Stack>
    </form>
  );
};
