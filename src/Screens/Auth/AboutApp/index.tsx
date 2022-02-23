import Constants from 'expo-constants';
import { Flex, Text, Image } from 'native-base';

export const AboutApp = () => (
  <Flex flex={1} justify="space-around" align="center" bg="#9E0404">
    <Image
      w="100%"
      h="150px"
      source={require('../../../assets/images/logo-flipp.png')}
      alt="Flipp Logo"
    />
    <Text color="#fff">Versão: {Constants.manifest.version}</Text>
  </Flex>
);
