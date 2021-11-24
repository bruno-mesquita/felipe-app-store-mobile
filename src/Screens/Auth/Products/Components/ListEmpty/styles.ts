import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { height, width, fontScale } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${height * 0.5}px;
  width: ${width}px;
`;

export const Text = styled.Text`
  font-size: ${17 * fontScale}px;
`;
