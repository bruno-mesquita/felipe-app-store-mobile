import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Divider = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors.secundary};
    width: 100%;
    height: 1px;
    elevation: 10;
    margin: 5px 0 10px 0;
  `}
`;
