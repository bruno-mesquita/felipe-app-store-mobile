import { Text } from 'react-native';
import { ErrorMessage, Formik } from 'formik';

import { Button } from '../../../Components';
import { Field } from '../../../Components/FormUtils';

import { Container, BackGround, ContainerLogo, Logo, ContentForm, ContainerInput, ContainerButton } from './styles';

export const CodeToForgotPassword = ({ navigation }) => {
  const codeValue = {
    code: '',
  };

  const onSubmit = (values: typeof codeValue) => {
    navigation.navigate('Changeconfirmpassword');
  };

  const goBackToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <Container>
      <BackGround source={require('../../../assets/images/fundo.png')}>
        <ContainerLogo>
          <Logo source={require('../../../assets/images/logo-flipp.png')} />
        </ContainerLogo>

        <Formik initialValues={codeValue} onSubmit={onSubmit}>
          {({ values, handleSubmit, handleChange }) => (
            <ContentForm>
              <ContainerInput>
                <Field value={values.code} placeholder="Código" onChangeText={handleChange('code')} label="Código" />
                <ErrorMessage component={Text} name="code" />
              </ContainerInput>

              <ContainerButton>
                <Button style={{ marginBottom: 50 }} onPress={() => handleSubmit()}>
                  Reenviar código
                </Button>

                <Button onPress={() => handleSubmit()}>Confirmar</Button>
              </ContainerButton>
            </ContentForm>
          )}
        </Formik>
      </BackGround>
    </Container>
  );
};

export default CodeToForgotPassword;
