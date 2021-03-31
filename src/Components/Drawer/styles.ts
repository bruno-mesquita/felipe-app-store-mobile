import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    padding: 60px 20px 0 20px;
    flex: 1;
    elevation: 10;
  `}
`;

export const Divider = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors.secundary};
    width: 80%;
    height: 0.7px;
    elevation: 10;
    margin: 5px 0 10px 0;
  `}
`;

export const User = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`;

export const UserAvatar = styled.Image`
  height: 125px;
  width: 125px;
  border-radius: 100;
`;

export const List = styled.ScrollView``;

export const ListItem = styled.TouchableOpacity`
  margin: 5px 0 5px 0;
`;

export const ListItemText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.secundary};
    font-size: 18px;
    font-family: ${theme.font};
  `}
`;
