import React from 'react';

import { Container, Text, styles } from './styles';
import { ButtonModalProps } from './props';

export const ButtonModal = ({ children, ...rest }: ButtonModalProps) => (
  <Container {...rest} style={[styles.container, rest.style as any]}>
    <Text>{children}</Text>
  </Container>
)
