import { View, Alert } from 'react-native';
import { Formik, ErrorMessage, FormikHelpers } from 'formik';

import { Button } from '../../../Components';
import { FieldSecure } from '../../../Components/FormUtils';
import api from '@services/api';

import { Container, ViewField, ViewForm, ViewFields } from './styles';

export const ChangePassword = () => {
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const onSubmit = async (
    values: typeof initialValues,
    { resetForm, setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      if (values.newPassword === values.confirmNewPassword) {
        await api.put('/establisments/update-password', values);

        setSubmitting(false);
        Alert.alert('Senha atualizada');
        resetForm();
      } else {
        setSubmitting(false);
        Alert.alert('Senhas iguais');
      }
    } catch (err) {
      setSubmitting(false);
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
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <ViewForm>
            <ViewFields>
              <ViewField>
                <FieldSecure
                  label="Senha atual"
                  labelColor="black"
                  value={values.currentPassword}
                  onChangeText={handleChange('currentPassword')}
                />
                <ErrorMessage component={View} name="currentPassword" />
              </ViewField>
              <ViewField>
                <FieldSecure
                  label="Nova senha"
                  labelColor="black"
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                />
                <ErrorMessage component={View} name="newPassword" />
              </ViewField>
              <ViewField>
                <FieldSecure
                  label="Confirmar senha"
                  labelColor="black"
                  value={values.confirmNewPassword}
                  onChangeText={handleChange('confirmNewPassword')}
                />
                <ErrorMessage component={View} name="confirmNewPassword" />
              </ViewField>
            </ViewFields>
            <View>
              <Button
                loading={isSubmitting}
                primaryColor
                onPress={() => handleSubmit()}
              >
                Atualizar
              </Button>
            </View>
          </ViewForm>
        )}
      </Formik>
    </Container>
  );
};
