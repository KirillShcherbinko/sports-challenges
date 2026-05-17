import { createTheme, type MantineColorsTuple } from '@mantine/core';
import { NOTIFICATION_THEME } from './notification-theme';

const DARK_COLORS: MantineColorsTuple = [
  '#f4f5f6', // 0: Самый светлый (текст на темном)
  '#e4e7eb', // 1: Светлый текст / границы
  '#cbd2d9', // 2: Иконки / заблокированные элементы
  '#9aa5b1', // 3: Второстепенный текст
  '#7b8794', // 4: Границы контейнеров
  '#616e7c', // 5: Внутренние разделители
  '#475a6b', // 6: Элементы форм / кнопки
  '#323f4b', // 7: Дефолтный фон карточек/модалок
  '#1f2933', // 8: Основной фон приложения (Body BG)
  '#12181f', // 9: Самый глубокий темный (шапка, сайдбар)
];

export const DARK_THEME = createTheme({
  colors: {
    dark: DARK_COLORS,
    brand: [
      '#eef3ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc1',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ],
  },

  primaryColor: 'brand',
  primaryShade: 6,

  defaultRadius: 'md',

  components: {
    Card: {
      defaultProps: {
        padding: 'xl',
        shadow: 'sm',
      },
    },
    Notification: NOTIFICATION_THEME,
  },
});
