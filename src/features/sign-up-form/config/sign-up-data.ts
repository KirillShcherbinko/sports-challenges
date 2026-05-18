import { signUpSchema } from '@/entities/auth';

export const SIGN_UP_DATA = {
  schema: signUpSchema,
  defaultValues: {
    username: '',
    email: '',
    password: '',
  },
  fields: {
    username: { required: true, label: 'Имя пользователя', placeholder: 'Ваше имя' },
    email: { required: true, label: 'Email', placeholder: 'example@mail.ru' },
    password: { required: true, label: 'Пароль', placeholder: '********' },
  },
};
