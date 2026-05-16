import { loginSchema } from '@/entities/auth';

import type { TLoginConfig } from '../model/types';

export const LOGIN_DATA: TLoginConfig = {
  schema: loginSchema,
  defaultValues: {
    email: '',
    password: '',
  },
  fields: {
    email: { required: true, label: 'Email', placeholder: 'example@mail.ru' },
    password: { required: true, label: 'Пароль', placeholder: '********' },
  },
};
