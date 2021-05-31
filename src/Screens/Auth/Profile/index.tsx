import React, { useRef } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { TextInputMasked } from 'react-native-masked-text';

import { useUser } from '../../../hooks';
import { Field, FieldMask, FieldError } from '../../../Components/FormUtils';
import { Button } from '../../../Components';
import { getApi } from '../../../services/api';

import { Container, Form } from './styles';
import { Values } from './props';
import schema from './schema';

export const Profile = () => {
  const user = useUser(['last_name', 'first_name', 'email', 'cellphone']);
  const inputPhoneRef = useRef<TextInputMasked>(null);

  const onSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    try {
      const api = getApi();

      const body = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        cellphone: inputPhoneRef.current?.getRawValue(),
      }

      await api.put('/owners', body);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso :)')
    } catch (err) {
      Alert.alert('Erro', 'Parece que houve um erro ao atualizar os seus dados :(')
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView>
      <Container>
        <Formik
          initialValues={user}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={schema}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <Form>
              <Field
                labelColor="#000"
                label="Primeiro nome"
                onChangeText={handleChange('first_name')}
                value={values.first_name}
              />
              <FieldError name="first_name" />

              <Field
                labelColor="#000"
                label="Sobbrenome"
                onChangeText={handleChange('last_name')}
                value={values.last_name}
              />
              <FieldError name="last_name" />

              <Field
                labelColor="#000"
                label="Email"
                onChangeText={handleChange('email')}
                value={values.email}
              />
              <FieldError name="email" />

              <FieldMask
                maskRef={inputPhoneRef}
                labelColor="#000"
                type="cel-phone"
                label="Telefone"
                options={{ withDDD: true }}
                onChangeText={handleChange('cellphone')}
                value={values.cellphone}
              />
              <FieldError name="cellphone" />

              <Button disabled={isSubmitting} loading={isSubmitting} style={{ marginTop: 20 }} onPress={() => handleSubmit()}>Atualizar</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ScrollView>
  )
}
