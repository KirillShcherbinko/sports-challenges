import type { TSignInSchema } from '@/entities/auth';
import { notifications } from '@mantine/notifications';
import { signInAction } from '../actions/sign-in';

export const signIn = async (formValues: TSignInSchema): Promise<void> => {
  try {
    await signInAction(formValues);
  } catch (error) {
    if (error instanceof Error) {
      notifications.show({
        title: 'Ошибка',
        message: error.message,
        color: 'red',
      });
    }
  }
};
