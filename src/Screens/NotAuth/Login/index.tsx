import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import { useAppDispatch } from '@store/hooks';
import { authActions } from '@store/reducers/auth';

import { Field, FieldSecure } from '../../../Components/FormUtils';
import { Button } from '../../../Components';
import { Layout } from '../_Layout';

import { MyError, Form, ContainerInput } from './styles';

import schema from './schema';
import type { Values } from './types';

export const Login = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    try {
      await dispatch(authActions.fetchLogin(values)).unwrap();
    } catch (err) {
      Alert.alert('Credenciais invalidas', 'Email ou senha estão incorretos');
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const forgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <Layout>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({ handleSubmit, handleChange, values, isSubmitting }) => (
          <Form>
            <ContainerInput>
              <Field
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="E-mail"
                label="E-mail"
              />
              <MyError name="email" />

              <FieldSecure
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder="Senha"
                label="Senha"
              />
              <MyError name="password" />
            </ContainerInput>

            {/* <ForgotPassword>
              <ForgotPasswordButton>
                <ForgotPasswordText onPress={forgotPassword}>Esqueci minha senha</ForgotPasswordText>
              </ForgotPasswordButton>
            </ForgotPassword> */}
            <Button
              style={{ marginTop: 20 }}
              loading={isSubmitting}
              onPress={() => handleSubmit()}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
