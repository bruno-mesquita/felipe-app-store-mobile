import React from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import { MenuForm } from '../../../Components';
import { getApi } from '../../../services/api';

import { Container } from './styles';
import { Values } from './props';

export const RegisterMenu = () => {
  const onSubmit = async (values: Values, { resetForm, setSubmitting }: FormikHelpers<Values>) => {
    try {
      const api = getApi();

      await api.post('/menus', values);

      setSubmitting(false);
      Alert.alert('Sucesso', 'Cadastro com sucesso!')
      resetForm();
    } catch (err) {
      setSubmitting(false);
      Alert.alert('Erro', 'Erro ao cadastrar')
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ name: '' } as Values}
        component={MenuForm}
      />
    </Container>
  )
}
