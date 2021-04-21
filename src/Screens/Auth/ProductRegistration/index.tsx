import React from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import { ProductForm } from '../../../Components';

import { Container } from './styles';
import api from '../../../services/api';
import schema from './schema';

export const ProductRegistration = () => {
  const initialValues = {
    name: '',
    price: '',
    description: '',
    menu: 0,
    image: null,
  }

  const onSubmit = async (values, { resetForm, setSubmitting }: FormikHelpers<any>) => {
    try {
      await api.post('/products', values);

      Alert.alert('Produto cadastrado com sucesso')
      resetForm();
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      Alert.alert('Erro ao cadastrar o produto');
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        component={ProductForm}
        validationSchema={schema}
      />
    </Container>
  )
}
