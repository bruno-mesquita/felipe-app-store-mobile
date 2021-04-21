import React from 'react';
import { Text } from 'react-native';

import { ItemProps } from './props';
import { Container } from './styles';

export const Item = ({ item }: ItemProps) => {
  return (
    <Container>
      <Text>{item.name}</Text>
    </Container>
  )
}
