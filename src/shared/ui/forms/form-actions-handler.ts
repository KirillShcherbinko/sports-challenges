import { notifications } from '@mantine/notifications';
import type { FieldValues } from 'react-hook-form';
import type { THandleFormActionErrorsProps } from './types';
import { EActionStatus } from '../error/enums';

export const handleFormActionErrors = <TFields extends FieldValues>({
  state,
  setError,
}: THandleFormActionErrorsProps<TFields>) => {
  if (state.status !== EActionStatus.Error || !state.errors) return;

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
