import { createTheme, type MantineColorsTuple } from '@mantine/core';
import { NOTIFICATION_THEME } from './notification-theme';

const DARK_COLORS: MantineColorsTuple = [
  '#f5f7fa',
  '#e8ecf3',
  '#d0d6e3',
  '#aab4c9',
  '#7f8ba5',
  '#5a657d',
  '#414b5e',
  '#2b3241',
  '#1a1f2b',
  '#0c0f16',
];

const BRAND_ELECTRIC: MantineColorsTuple = [
  '#f4f2ff',
  '#e9e5ff',
  '#d4ceff',
  '#b8afff',
  '#9988ff',
  '#7c5cff',
  '#5e3aff',
  '#4725ff',
  '#3318e6',
  '#2612c4',
];

const SUCCESS_VIBRANT: MantineColorsTuple = [
  '#f0fdf6',
  '#dcfce9',
  '#b8f5d8',
  '#86e8bf',
  '#4dd9a0',
  '#16c484',
  '#0aa870',
  '#06855a',
  '#046645',
  '#024a32',
];

export const DARK_THEME = createTheme({
  colors: {
    dark: DARK_COLORS,
    brand: BRAND_ELECTRIC,
    success: SUCCESS_VIBRANT,
  },

  primaryColor: 'brand',
  primaryShade: 5,

  defaultRadius: 'md',
  autoContrast: true,

  components: {
    Card: {
      defaultProps: {
        padding: 'xl',
        shadow: 'lg',
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: 'var(--mantine-color-dark-6)',
          background: 'var(--mantine-color-dark-8)',
        },
      },
    },

    Button: {
      styles: {
        root: {
          fontWeight: 600,
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        },
      },
    },

    Progress: {
      styles: {
        section: {
          transition: 'width 0.3s ease',
          background: 'linear-gradient(90deg, var(--mantine-color-brand-6), var(--mantine-color-brand-4))',
        },
      },
    },

    PasswordInput: {
      styles: {
        visibilityToggle: {
          transition: 'background-color 150ms ease, color 150ms ease',
          borderRadius: '50%',
          '--ai-hover': 'var(--mantine-color-dark-6)',
        },
      },
    },

    Notification: NOTIFICATION_THEME,
  },
});
