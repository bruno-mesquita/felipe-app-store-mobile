import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { ButtonModal } from '../../../ButtonModal';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  height: auto;
  width: ${width * 0.8}px;
  padding: 20px 20px 0px 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  align-self: center;
  margin-bottom: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
`;

export const Button = styled(ButtonModal)`
  width: 40%;
  margin-top: 10px;
`;
