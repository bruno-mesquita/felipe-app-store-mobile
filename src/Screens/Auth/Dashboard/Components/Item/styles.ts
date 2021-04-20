import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Container = styled.TouchableOpacity`${({ theme }) => css`
  background-color: ${theme.colors.primary};
  width: ${width * 0.28}px;
  height: ${width * 0.28}px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: 5px;
`}`;
