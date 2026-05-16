import type { PropsWithChildren } from 'react';

import { MantineProvider } from '@mantine/core';
import { DARK_THEME } from '@/shared';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <MantineProvider theme={DARK_THEME}>{children}</MantineProvider>;
};
