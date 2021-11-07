import { useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import Clipboard from 'expo-clipboard';

import { Container, Title, CardContainer } from './styles';

export const Support = () => {
  const { colors } = useTheme();

  const [email, setSupport] = useState('flipp.suport@flipp.com');

  const copyToClipboard = () => {
    Clipboard.setString(email);
    Alert.alert('', 'Email copiado');
  };

  return (
    <Container>
      <Title>Contato</Title>
      <Text style={{ fontSize: 18 }}>Entre em contato conosco pelo nosso email </Text>
      <CardContainer>
        <MaterialCommunityIcons name="email" size={50} color={colors.primary} />
        <TouchableOpacity onPress={copyToClipboard}><Text>{email}</Text></TouchableOpacity>
      </CardContainer>
    </Container>
  )
}
