import type { z } from 'zod';
import type { signInSchema, signUpSchema } from './shemas';

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TAuthProps = {
  required: boolean;
  label: string;
  placeholder?: string;
};
