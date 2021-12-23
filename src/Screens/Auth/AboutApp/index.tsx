import { Text, Image } from 'react-native';
import Constants from 'expo-constants';

import { Container } from './styles';

export const AboutApp = () => (
  <Container>
    <Image style={{ width: '100%', height: 150 }} source={require('../../../assets/images/logo-flipp.png')} />
    <Text style={{ color: '#fff' }}>Versão: {Constants.manifest.version}</Text>
  </Container>
);
