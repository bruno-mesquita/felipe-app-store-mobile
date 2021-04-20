import React from 'react';

import { Container } from './styles';
import { ItemProps } from './props';

export const Item = ({ children, ...rest }: ItemProps) => (
  <Container {...rest}>
    {children}
  </Container>
)
