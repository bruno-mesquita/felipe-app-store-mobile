import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  height: ${height}px;
`;

export const BackGround = styled.ImageBackground`
  flex: 1;
  height: ${height}px;
  justify-content: space-around;
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
  margin-top: 40%;
`;

export const ContainerInput = styled.View`
  width: 295px;
`;

export const ContainerButton = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
`;
