import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;
