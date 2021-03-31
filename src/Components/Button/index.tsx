import React from 'react';
import { NativeBase } from 'native-base';

import { Container, ButtonConfig, TextConfig } from './styles';

export type Props = NativeBase.Button & {
  children: React.ReactNode;
  primaryColor?: boolean;
};

export const Button = ({ primaryColor = false, children, ...rest }: Props) => {
  return (
    <Container>
      <ButtonConfig {...rest} primaryColor={primaryColor}>
        <TextConfig primaryColor={primaryColor}>{children}</TextConfig>
      </ButtonConfig>
    </Container>
  );
};

