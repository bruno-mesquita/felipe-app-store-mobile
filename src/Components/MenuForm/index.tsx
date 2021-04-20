import React from 'react';
import { Text } from 'react-native';
import { FormikProps } from 'formik';

import { Button } from '../Button';
import { Field, FieldError } from '../FormUtils';

import { Container } from './styles';
import { Values } from './props';

export const MenuForm = ({ values, handleChange, handleSubmit, isSubmitting }: FormikProps<Values>) => {
  return (
    <Container>
      <Field
        label="Nome"
        labelColor="#000"
        value={values.name}
        onChangeText={handleChange('name')}
      />
      <FieldError name="name" />

      <Button loading={isSubmitting} onPress={() => handleSubmit()}>{values.id ? 'Atailizar' : 'Cadastrar'}</Button>
    </Container>
  )
}
