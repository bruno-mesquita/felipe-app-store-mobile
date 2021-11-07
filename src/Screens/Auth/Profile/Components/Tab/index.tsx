import * as React from 'react';
import { useTheme } from 'styled-components/native';

import { Container, Text } from './styles';

interface TabProps {
  active: boolean;
  onPress: () => void;
  children: React.ReactNode,
}



export const Tab = ({ active = false, onPress, children }: TabProps) => {
  const { colors } = useTheme();

  return (
    <Container onPress={onPress} style={active ? { borderBottomWidth: 3, borderBottomColor: colors.secundary }: null}>
      <Text>{children}</Text>
    </Container>
  )
}
