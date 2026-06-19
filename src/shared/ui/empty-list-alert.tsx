import { Text } from '@mantine/core';

type TEmptyListAlertProps = {
  message: string;
};

export const EmptyListAlert = ({ message }: TEmptyListAlertProps) => {
  return <Text c="var(--mantine-color-dark-2)">{message}</Text>;
};
