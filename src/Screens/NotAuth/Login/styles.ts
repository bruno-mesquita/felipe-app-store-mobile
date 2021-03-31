import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'; // para usuário de Iphone
import { Input as NBInput, Item as NBItem, Button, Text } from 'native-base';

export const Container = styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight()}px;
`;

export const BackGround = styled.ImageBackground`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const Form = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ContainerLogo = styled.View`
  align-items: center;
  margin-bottom: 10%;
`;

export const Logo = styled.Image`
  height: 119px;
  width: 290px;
`;

export const LogoTestText = styled.Text`
  color: #fff;
  font-size: 28px;
`;

export const ContainerInput = styled.View`
  width: 90%;
  align-items: center;
  margin-top: 10%;
`;

export const Input = styled(NBInput).attrs(props => ({
  placeholderTextColor: '#fff',
  ...props,
}))`
  background-color: #770202;
  color: #fff;
  border-radius: 25px;
`;

export const ForgotPassword = styled.View`
  height: 40px;
  width: 90%;
  align-items: flex-end;
  margin-top: 10px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  margin-right: 45px;
`;

export const ForgotPasswordText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const StayConnect = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
`;

// export const checkUserConnect = styled.check

export const ContainerButton = styled.View`
  width: 100%;
  align-items: center;
`;
