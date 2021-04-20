import React from 'react';

import { Container } from './styles';

export const Item = ({ children }: { children: React.ReactNode }) => {

  return (
    <Container>
      {children}
    </Container>
  )
}
