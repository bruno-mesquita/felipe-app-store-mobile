import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { height, width, fontScale } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${height}px;
  width: ${width}px;
  border: 1px solid;
`;

export const Text = styled.Text`
  font-size: ${17 * fontScale}px;
`;
