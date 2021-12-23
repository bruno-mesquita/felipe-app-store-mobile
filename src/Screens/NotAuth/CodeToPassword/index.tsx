import { Text } from 'react-native';
import { ErrorMessage, Formik } from 'formik';

import { Button } from '../../../Components';
import { Field } from '../../../Components/FormUtils';

import { Container, BackGround, ContainerLogo, Logo, ContentForm, ContainerInput, ContainerButton } from './styles';

export const CodeToPassword = ({ navigation }) => {
  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const onSubmit = (values: typeof initialValues) => {};

  const confirmCodeToPassword = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <BackGround source={require('../../../assets/images/fundo.png')}>
        <ContainerLogo>
          <Logo source={require('../../../assets/images/logo-flipp.png')} />
        </ContainerLogo>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleSubmit, handleChange }) => (
            <ContentForm>
              <ContainerInput>
                <Field
                  value={values.newPassword}
                  placeholder="Nova senha"
                  onChangeText={handleChange('newPassword')}
                  label="Nova senha"
                />
                <ErrorMessage component={Text} name="newPassword" />
              </ContainerInput>

              <ContainerInput>
                <Field
                  value={values.confirmPassword}
                  placeholder="Confirmar senha"
                  onChangeText={handleChange('confirmPassword')}
                  label="Confirmar senha"
                />
                <ErrorMessage component={Text} name="confirmPassword" />
              </ContainerInput>

              <ContainerButton>
                <Button onPress={() => confirmCodeToPassword()}>Salvar</Button>
              </ContainerButton>
            </ContentForm>
          )}
        </Formik>
      </BackGround>
    </Container>
  );
};
