import { useState } from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers, ErrorMessage } from 'formik';
import { Button, FormControl, Input, Flex } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppDispatch } from '@store/hooks';
import { authActions } from '@store/reducers/auth';

import { Layout } from '../_Layout';

import schema from './schema';
import type { Values } from './types';

export const Login = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

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
          <Flex align="center" px="20px">
            <FormControl>
              <FormControl.Label _text={{ color: '#fff' }}>E-mail</FormControl.Label>
              <Input
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="E-mail"
              />
              <ErrorMessage name="email" component={FormControl.ErrorMessage} />
            </FormControl>

            <FormControl mt="10px">
              <FormControl.Label _text={{ color: '#fff' }}>Senha</FormControl.Label>
              <Input
                secureTextEntry={!visible}
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder="Senha"
                rightElement={
                  <MaterialCommunityIcons
                    onPress={() => setVisible(!visible)}
                    size={25}
                    color="#fff"
                    style={{ marginRight: 10 }}
                    name={visible ? 'eye' : 'eye-off'}
                  />
                }
              />
              <ErrorMessage name="password" component={FormControl.ErrorMessage} />
            </FormControl>

            {/* <ForgotPassword>
              <ForgotPasswordButton>
                <ForgotPasswordText onPress={forgotPassword}>Esqueci minha senha</ForgotPasswordText>
              </ForgotPasswordButton>
            </ForgotPassword> */}
            <Button
              w="50%"
              mt="50px"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
              onPress={() => handleSubmit()}
            >
              Login
            </Button>
          </Flex>
        )}
      </Formik>
    </Layout>
  );
};
