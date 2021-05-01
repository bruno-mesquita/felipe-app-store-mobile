import React from 'react';
import { Alert, ScrollView } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import { useUser } from '../../../../../hooks';
import { Field, FieldError, Select } from '../../../../../Components/FormUtils';
import { Button } from '../../../../../Components';
import { getApi } from '../../../../../services/api';

import { Container, Form } from './styles';
import { Values } from './props';
import schema from './schema';

export const FormAddress = () => {
  const { address } = useUser(['address']);

  const onSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    try {
      const api = getApi();

      await api.put('/establishments/address', values);
      setSubmitting(false);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso :)')
    } catch (err) {
      setSubmitting(false);
      Alert.alert('Erro', 'Parece que houve um erro ao atualizar os seus dados :(')
    }
  }

  return (
    <ScrollView>
      <Container>
        <Formik
          initialValues={{ ...address, state: address.city.state_id, city: address.city.id }}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={schema}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <Form>
              <Field
                labelColor="#000"
                label="Logradouro"
                onChangeText={handleChange('street')}
                value={values.street}
              />
              <FieldError name="street" />

              <Field
                labelColor="#000"
                label="Número"
                onChangeText={handleChange('number')}
                value={values.number}
              />
              <FieldError name="number" />

              <Field
                labelColor="#000"
                label="Bairro"
                onChangeText={handleChange('neighborhood')}
                value={values.neighborhood}
              />
              <FieldError name="neighborhood" />

              <Field
                labelColor="#000"
                label="CEP"
                onChangeText={handleChange('cep')}
                value={String(values.cep)}
              />
              <FieldError name="cep" />

              <Select
                labelColor="#000"
                label="Estado"
                value={String(values.state)}
                onChange={value => setFieldValue('state', value)}
                placeholder="Selecione um estado"
                path="/states"
              />
              <FieldError name="state" />

              <Select
                labelColor="#000"
                label="Cidade"
                value={String(values.city)}
                onChange={value => setFieldValue('city', value)}
                placeholder="Selecione uma cidade"
                path={`/cities/${values.state}`}
              />
              <FieldError name="city" />


              <Button style={{ marginTop: 20 }} loading={isSubmitting} disabled={isSubmitting} onPress={() => handleSubmit()}>Atualizar</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ScrollView>
  )
}
