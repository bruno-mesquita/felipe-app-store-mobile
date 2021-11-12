import { Formik, FormikHelpers } from 'formik';

import { useAuth } from '@contexts/AuthContext';
import { Field, FieldSecure } from '../../../Components/FormUtils';
import { Button } from '../../../Components';
import { Layout } from '../_Layout';

import {
  Error,
  Form,
  ContainerInput,
  ForgotPassword,
  ForgotPasswordButton,
  ForgotPasswordText,
} from './styles';

import schema from './schema';
import { Values } from './types';

export const Login = ({ navigation }) => {
  const { signIn } = useAuth();

  const onSubmit = ({ email, password }: Values, { setSubmitting }: FormikHelpers<Values>) => {
    signIn(email, password).finally(() => setSubmitting(false));
  };

  const forgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <Layout>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({ handleSubmit, handleChange, values, setFieldValue, isSubmitting }) => (
          <Form>
            <ContainerInput>
              <Field
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="E-mail"
                label="E-mail"
              />
              <Error name="email" />

              <FieldSecure
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder="Senha"
                label="Senha"
              />
              <Error name="password" />
            </ContainerInput>

            <ForgotPassword>
              <ForgotPasswordButton>
                <ForgotPasswordText onPress={forgotPassword}>
                  Esqueci minha senha
                </ForgotPasswordText>
              </ForgotPasswordButton>
            </ForgotPassword>
            <Button style={{ marginTop: 20 }} loading={isSubmitting} onPress={() => handleSubmit()}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
