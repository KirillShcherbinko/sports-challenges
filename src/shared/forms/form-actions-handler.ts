import { notifications } from '@mantine/notifications';
import type { FieldValues } from 'react-hook-form';
import type { THandleActionErrorsProps } from './types';
import { EFormActionStatus } from './enums';

export const handleFormActionErrors = <TFields extends FieldValues>({
  state,
  setError,
}: THandleActionErrorsProps<TFields>) => {
  if (state.status !== EFormActionStatus.Error || !state.errors) return;

  const { root, fields } = state.errors;

  if (root) {
    notifications.show({
      title: 'Ошибка',
      message: root,
      color: 'red',
    });
  }

  fields?.forEach(({ field, message }) => {
    setError?.(field, { message });
  });
};
