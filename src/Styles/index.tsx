import type { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './theme';

export const Styles: FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
