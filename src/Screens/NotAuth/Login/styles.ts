import styled from 'styled-components/native';
import { Text } from 'react-native';
import { ErrorMessage } from 'formik';

export const Form = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ContainerInput = styled.View`
  width: 90%;
  align-items: center;
  margin-top: 10%;
`;

export const ForgotPassword = styled.View`
  height: 30px;
  width: 100%;
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

export const Error = styled(ErrorMessage).attrs(props => ({
  ...props,
  component: Text,
}))`
  color: #fff;
`;
