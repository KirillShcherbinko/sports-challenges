import { Notification } from '@mantine/core';

export const NOTIFICATION_THEME = Notification.extend({
  styles: {
    root: {
      borderLeft: '4px solid var(--notification-color)',
    },
  },
  vars: (_theme, props) => {
    if (props.color === 'red') {
      return {
        root: {
          '--notification-color': 'var(--mantine-color-red-filled)',
          backgroundColor: 'var(--mantine-color-red-light)',
        },
      };
    }

    if (props.color === 'green') {
      return {
        root: {
          '--notification-color': 'var(--mantine-color-green-filled)',
          backgroundColor: 'var(--mantine-color-green-light)',
        },
      };
    }

    return { root: {} };
  },
});
