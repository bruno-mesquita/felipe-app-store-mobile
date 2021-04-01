import React from 'react';
import { Text, Image } from 'react-native';
import Constants from 'expo-constants';

import { Container } from './styles';

export const AboutApp = () => (
  <Container>
    <Image source={require('../../../assets/images/logo.png')} />
    <Text style={{ color: '#fff' }}>Versão: {Constants.manifest.version}</Text>
  </Container>
);
