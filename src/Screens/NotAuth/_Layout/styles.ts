import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
`;

export const BackGround = styled.ImageBackground`
  flex: 1;
  padding-bottom: 30px;
`;

export const ContainerLogo = styled.View`
  align-items: center;
  margin-top: 50px;
`;

export const Logo = styled.Image.attrs((props) => ({
  ...props,
  resizeMode: 'contain',
}))`
  height: ${height * 0.3}px;
  width: ${width * 0.8}px;
`;
