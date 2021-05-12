import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Content = styled.View`
  width: ${width * 0.8}px;
  height: auto;
  padding: 15px;
`;

export const ViewButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15px;
`;
