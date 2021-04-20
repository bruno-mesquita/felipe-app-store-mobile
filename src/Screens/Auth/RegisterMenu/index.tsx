import React from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import { MenuForm } from '../../../Components';
import api from '../../../services/api';

import { Container } from './styles';

export const RegisterMenu = () => {
  const onSubmit = async (values, { resetForm, setSubmitting }: FormikHelpers<any>) => {
    try {
      await api.post('/menus', values);

      setSubmitting(false);
      Alert.alert('Cadastro com sucesso!')
      resetForm();
    } catch (err) {
      setSubmitting(false);
      Alert.alert('Erro ao cadastrar')
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ name: '' }}
        component={MenuForm}
      />
    </Container>
  )
}
