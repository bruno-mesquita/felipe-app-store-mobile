import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  align-items: center;
`;

export const Header = styled.View`
  padding-top: 15px;
  height: 55%;
  width: 100%;
`;

export const Footer = styled.View`
  height: 45%;
  width: 100%;
`;

export const TitleFooter = styled.Text`${({ theme }) => css`
  color: ${theme.colors.primary};
  font-weight: bold;
  font-size: 25px;
  text-transform: uppercase;
`}`;

export const ViewTitle = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 15px;
`;
