import React from 'react';
import { Text } from 'react-native';
import { FormikProps } from 'formik';

import { Container } from './styles';

export const ProductForm = (formikProps: FormikProps<any>) => {
  return <Container><Text>Formulário de Produto</Text></Container>
}
