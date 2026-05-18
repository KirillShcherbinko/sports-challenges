import { SignInForm } from '@/features/sign-in-form';
import { ERoutes } from '@/shared';
import { Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

export const SignInPage = () => {
  return (
    <Stack w="100%">
      <Title component="h1">Вход</Title>
      <Text size="lg" fw={500} c="var(--mantine-color-dark-2)">
        Заполните поля снизу для входа
      </Text>
      <SignInForm />
      <Text c="var(--mantine-color-dark-3)" ta="center" fw={300}>
        Нет аккаунта? <Link href={ERoutes.SIGN_UP}>Зарегистироваться</Link>
      </Text>
    </Stack>
  );
};
