'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SIGN_IN_DATA } from '../config/sign-in-data';
import type { TSignInSchema } from '@/entities/auth';
import { Stack, TextInput, PasswordInput, Button } from '@mantine/core';
import { EActionStatus, handleFormActionErrors } from '@/shared';
import { signInAction } from '../actions/sign-in';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const SignInForm = () => {
  const { schema, defaultValues, fields } = SIGN_IN_DATA;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { formState, handleSubmit, register } = useForm<TSignInSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formValues: TSignInSchema) => {
    const state = await signInAction(formValues);

    handleFormActionErrors({ state });

    if (state.status === EActionStatus.Success && state.redirect) {
      const redirect = state.redirect;

      startTransition(() => {
        router.push(redirect);
      });
    }
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
