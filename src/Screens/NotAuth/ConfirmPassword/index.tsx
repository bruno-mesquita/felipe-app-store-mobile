import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ErrorMessage, Formik } from 'formik';

import { Button, Field } from '../../../Components';

import {
  Container,
  BackGround,
  ContainerLogo,
  Logo,
  ContentForm,
  ContainerInput,
  ContainerButton,
} from './styles';

interface Values {
  newPassword: string;
  confirmPassword: string;
}

export const CodeToPassword = () => {
  const navigation = useNavigation();

  const codeValue: Values = {
    newPassword: '',
    confirmPassword: '',
  };

  const onSubmit = (values: Values) => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <BackGround source={require('../../../assets/images/fundo.png')}>
        <ContainerLogo>
          <Logo source={require('../../../assets/images/logo.png')} />
        </ContainerLogo>

        <Formik initialValues={codeValue} onSubmit={onSubmit}>
          {({ values, handleSubmit, handleChange }) => (
            <ContentForm>
              <ContainerInput>
                <Field
                  value={values.newPassword}
                  placeholder="Nova senha"
                  onChangeText={handleChange('password')}
                  textValue="Nova senha"
                />
                <ErrorMessage component={Text} name="password" />
              </ContainerInput>

              <ContainerInput>
                <Field
                  value={values.confirmPassword}
                  placeholder="Confirmar senha"
                  onChangeText={handleChange('confirmPassword')}
                  textValue="Confirmar senha"
                />
                <ErrorMessage component={Text} name="confirmPassword" />
              </ContainerInput>

              <ContainerButton>
                <Button onPress={handleSubmit}>Salvar</Button>
              </ContainerButton>
            </ContentForm>
          )}
        </Formik>
      </BackGround>
    </Container>
  );
};

