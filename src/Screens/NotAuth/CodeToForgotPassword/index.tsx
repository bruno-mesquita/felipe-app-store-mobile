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
  code: string;
}

export const CodeToForgotPassword = () => {
  const navigation = useNavigation();

  const codeValue: Values = {
    code: '',
  };

  const onSubmit = (values: Values) => {
    console.log(values);
    navigation.navigate('CodeToForgotPassword');
  };

  const ResendCode = () => {
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
                  value={values.code}
                  placeholder="Código"
                  onChangeText={handleChange('code')}
                  textValue="Código"
                />
                <ErrorMessage component={Text} name="code" />
              </ContainerInput>

              <ContainerButton>
                <Button
                  style={{ marginBottom: 50 }}
                  onPress={ResendCode}
                >
                  Reenviar código
                </Button>

                <Button onPress={handleSubmit}>Confirmar</Button>
              </ContainerButton>
            </ContentForm>
          )}
        </Formik>
      </BackGround>
    </Container>
  );
};

