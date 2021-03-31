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
  email: string;
}

export const ForgotPassword = () => {
  const navigation = useNavigation();

  const codeValue: Values = {
    email: '',
  };

  const onSubmit = (values: Values) => {
    console.log(values);
    navigation.navigate('CodeToPassword');
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
                  value={values.email}
                  placeholder="E-mail"
                  onChangeText={handleChange('email')}
                  textValue="E-mail"
                />
                <ErrorMessage component={Text} name="email" />
              </ContainerInput>

              <ContainerButton>
                <Button onPress={handleSubmit}>Enviar</Button>
              </ContainerButton>
            </ContentForm>
          )}
        </Formik>
      </BackGround>
    </Container>
  );
};

