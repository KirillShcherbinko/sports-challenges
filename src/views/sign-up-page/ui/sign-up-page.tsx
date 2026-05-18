import { SignUpForm } from '@/features/sign-up-form';
import { ERoutes } from '@/shared';
import { Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

export const SignUpPage = () => {
  return (
    <Stack w="100%" gap="lg">
      <Title component="h1">Регистрация</Title>
      <Text size="lg" fw={500} c="var(--mantine-color-dark-2)">
        Заполните поля снизу для регистрации
      </Text>
      <SignUpForm />
      <Text c="var(--mantine-color-dark-3)" ta="center" fw={300}>
        Уже есть аккаунт? <Link href={ERoutes.SIGN_IN}>Войти</Link>
      </Text>
    </Stack>
  );
};
