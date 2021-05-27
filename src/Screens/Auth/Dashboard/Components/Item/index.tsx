import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';
import { ItemProps } from './props';

export const Item = ({ children, never, ...rest }: ItemProps) => {
  const { establishmentExists } = useSelector(({ auth }) => auth);

  return (
    <Container disabled={!establishmentExists && !never} style={!establishmentExists && !never ? { backgroundColor: '#c4c4c4' } : {}} {...rest as any}>
      {children}
    </Container>
  )
}
