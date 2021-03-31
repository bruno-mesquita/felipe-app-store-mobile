import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './theme';
import { Props } from '../utils/props';

const Styles = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Styles;
