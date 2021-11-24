import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: ${({ theme }) => `${theme.metrics.px(15)}px 0px`};
  width: 100%;
  align-items: center;
`;

export const Header = styled.View`
  padding-top: ${({ theme }) => theme.metrics.px(15)}px;
  height: auto;
  width: 100%;
`;

export const Footer = styled.View`
  height: auto;
  width: 100%;
  justify-content: flex-end;
`;

export const TitleFooter = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-weight: bold;
    font-size: ${({ theme }) => theme.metrics.px(45)}px;
    text-transform: uppercase;
  `}
`;

export const ViewTitle = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.metrics.px(15)}px;
`;

export const Text = styled.Text`
  color: #fff;
  text-align: center;
  font-size: ${({ theme }) => theme.metrics.px(25)}px;
`;
