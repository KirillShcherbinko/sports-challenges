import type { z } from 'zod';
import type { loginSchema, registerSchema } from './shemas';

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;

export type TAuthProps = {
  required: boolean;
  label: string;
  placeholder?: string;
};
