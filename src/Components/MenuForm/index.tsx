import React from 'react';
import { Text } from 'react-native';
import { FormikProps } from 'formik';

import { Container } from './styles';

export const MenuForm = (formikProps: FormikProps<any>) => {
  return <Container><Text>Formulário de Menu</Text></Container>
}
