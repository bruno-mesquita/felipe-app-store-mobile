import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding-top: ${getStatusBarHeight()}px;
`;

export const BackGround = styled.ImageBackground`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ContainerLogo = styled.View`
  align-items: center;
`;

export const Logo = styled.Image`
  height: 119px;
  width: 290px;
`;

export const ContentForm = styled.View`
  align-items: center;
  margin-top: 45%;
`;

export const ContainerInput = styled.View`
  width: 295px;
`;

export const ContainerButton = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
`;
