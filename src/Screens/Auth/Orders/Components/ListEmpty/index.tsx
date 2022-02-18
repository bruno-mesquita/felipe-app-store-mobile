import { useWindowDimensions } from 'react-native';
import { Flex, Text } from 'native-base';

export const ListEmpty = () => {
  const { width, height, fontScale } = useWindowDimensions();

  return (
    <Flex flex={1} justify="center" align="center" w={width} h={height}>
      <Text fontSize={17 * fontScale}>Nenhum pedido</Text>
    </Flex>
  );
};
