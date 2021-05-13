import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  align-self: center;
`;

export const FlatListHeader = styled.View`
  padding: 5px;
  border: 1px solid #6e6d6d;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.primary};
`;
