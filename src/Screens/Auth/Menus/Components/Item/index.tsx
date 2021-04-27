import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { ItemProps } from './props';
import { Container, Text } from './styles';

export const Item = ({ item }: ItemProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const edit = () => navigation.navigate('UpdateMenu', { id: item.id });

  return (
    <Container>
      <Text>{item.name}</Text>
      <Ionicons name="chevron-forward" onPress={edit} size={25} color={colors.primary} />
    </Container>
  )
}
