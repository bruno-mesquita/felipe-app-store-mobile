import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: space-around;
  padding-left: 25px;
  padding-right: 25px;
`;

export const UserAvatar = styled.Image.attrs(props => ({
  ...props,
  resizeMode: 'cover'
}))`
  height: 120px;
  width: 120px;
  border-radius: 50px;
`;
