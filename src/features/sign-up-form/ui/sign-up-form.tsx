'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SIGN_UP_DATA } from '../config/sign-up-data';
import type { TSignUpSchema } from '@/entities/auth';
import { Stack, TextInput, PasswordInput, Button } from '@mantine/core';
import { handleFormActionErrors, EFormActionStatus } from '@/shared';
import { useRouter } from 'next/navigation';
import { signUpAction } from '../actions/sign-up';

export const SignUpForm = () => {
  const { schema, defaultValues, fields } = SIGN_UP_DATA;

  const router = useRouter();

  const { formState, handleSubmit, register, setError } = useForm<TSignUpSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formValues: TSignUpSchema) => {
    const state = await signUpAction(formValues);

    handleFormActionErrors({ state, setError });

    if (state.status === EFormActionStatus.Success && state.redirect) {
      router.push(state.redirect);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput error={formState.errors.username?.message} {...fields.username} {...register('username')} />
        <TextInput error={formState.errors.email?.message} {...fields.email} {...register('email')} />
        <PasswordInput error={formState.errors.password?.message} {...fields.password} {...register('password')} />
        <Button type="submit" loading={formState.isSubmitting}>
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};
