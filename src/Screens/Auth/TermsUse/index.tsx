import React from 'react';
import { Text, Image } from 'react-native';

import { Container } from './styles';

export const AboutApp = () => (
  <Container>
    <Image source={require('../../../assets/images/logo.png')} />
    <Text style={{ color: '#fff' }}>Termos de uso</Text>
  </Container>
);
