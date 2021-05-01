import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.secundary};
  font-size: 18px;
`;
