import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding-top: 10px;
  width: 100%;
  align-items: center;
`;

export const Divider = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    width: 90%;
    height: 0.7px;
    elevation: 4;
    margin: 5px 0 10px 0;
  `}
`;
