import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Text } from './styles';
import { ItemProps } from './props';

export const Item = ({ children, to, onPress }: ItemProps) => {
  const navigation = useNavigation();

  return (
    <Container onPress={onPress ? onPress : () => navigation.navigate(to)}>
      <Text>{children}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={25} />
    </Container>
  );
};
