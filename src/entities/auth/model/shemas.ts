import { usernameSchema } from '@/entities/profile';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from './consts';
import { z } from 'zod';

const noemptyFieldSchema = z.string().nonempty('Поле обязателено');

const emailSchema = z.email('Неверный Email').nonempty('Email обязателен');

const passwordSchema = z
  .string()
  .nonempty('Пароль обязателен')
  .min(MIN_PASSWORD_LENGTH, `Минимальная длина пароля: ${MIN_PASSWORD_LENGTH}`)
  .max(MAX_PASSWORD_LENGTH, `Максимальная длина пароля: ${MAX_PASSWORD_LENGTH}`)
  .regex(/[0-9]/, 'Пароль должен содержать цифру')
  .regex(/[A-Z]/, 'Пароль должен содержать заглавную букву');

export const signInSchema = z.object({
  email: emailSchema,
  password: noemptyFieldSchema,
});

export const signUpSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});
