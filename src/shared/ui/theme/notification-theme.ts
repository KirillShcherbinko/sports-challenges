export const NOTIFICATION_THEME = {
  styles: {
    root: {
      borderLeftWidth: '4px',
      borderLeftStyle: 'solid',
    },

    color: {
      '&[data-color="red"]': {
        borderLeftColor: 'var(--mantine-color-red-filled)',
        backgroundColor: 'var(--mantine-color-red-light)',
      },

      '&[data-color="green"]': {
        borderLeftColor: 'var(--mantine-color-green-filled)',
        backgroundColor: 'var(--mantine-color-green-light)',
      },
    },
  },
};
