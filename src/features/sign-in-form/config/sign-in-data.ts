import { signInSchema } from '@/entities/auth';

export const SIGN_IN_DATA = {
  schema: signInSchema,
  defaultValues: {
    email: '',
    password: '',
  },
  fields: {
    email: { required: true, label: 'Email', placeholder: 'example@mail.ru' },
    password: { required: true, label: 'Пароль', placeholder: '********' },
  },
};
