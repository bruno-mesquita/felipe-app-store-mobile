import React from 'react';
import { View, Alert } from 'react-native';
import { Formik, ErrorMessage } from 'formik';

import { Button, Field } from '../../../Components';
import api from '../../../services/api';

import { Container, ViewField, ViewForm, ViewFields } from './styles';

export const ChangePassword = () => {
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      if (values.newPassword === values.confirmNewPassword) {
        await api.put('/clients/update-password', values);

        Alert.alert('Senha atualizada');
      } else {
        Alert.alert('Senhas iguais');
      }
    } catch (err) {
      console.log(err.response);

      Alert.alert('Erro ao atualizar a senha');
    }
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleSubmit }) => (
          <ViewForm>
            <ViewFields>
              <ViewField>
                <Field
                  textValue="Senha atual"
                  textColor="black"
                  value={values.currentPassword}
                  secureTextEntry
                  onChangeText={handleChange('currentPassword')}
                />
                <ErrorMessage component={View} name="currentPassword" />
              </ViewField>
              <ViewField>
                <Field
                  textValue="Nova senha"
                  textColor="black"
                  value={values.newPassword}
                  secureTextEntry
                  onChangeText={handleChange('newPassword')}
                />
                <ErrorMessage component={View} name="newPassword" />
              </ViewField>
              <ViewField>
                <Field
                  textValue="Confirmar senha"
                  textColor="black"
                  value={values.confirmNewPassword}
                  secureTextEntry
                  onChangeText={handleChange('confirmNewPassword')}
                />
                <ErrorMessage component={View} name="confirmNewPassword" />
              </ViewField>
            </ViewFields>
            <View>
              <Button primaryColor onPress={handleSubmit}>
                Atualizar
              </Button>
            </View>
          </ViewForm>
        )}
      </Formik>
    </Container>
  );
};
