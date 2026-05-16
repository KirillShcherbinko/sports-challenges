import type { loginSchema, TAuthProps, TLoginSchema } from '@/entities/auth';

export type TLoginConfig = {
  schema: typeof loginSchema;
  defaultValues: TLoginSchema;
  fields: Record<keyof TLoginSchema, TAuthProps>;
};
