import type { Metadata } from 'next';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { inter } from './fonts/inter';
import './index.css';
import { ThemeProvider } from './providers/theme';
import type { PropsWithChildren } from 'react';
import { Notifications } from '@mantine/notifications';
import { MainLayout } from '@/widgets/main-layout';

export const metadata: Metadata = {
  title: 'Sport Challenges — спортивные челленджи',
  description:
    'Платформа для прохождения и создания спортивных челленджей с ежедневными заданиями и системой прогресса.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Notifications />
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
