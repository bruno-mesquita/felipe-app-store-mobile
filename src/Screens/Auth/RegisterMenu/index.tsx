import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import { MenuForm } from '../../../Components';
import api from '@services/api';

import { Container } from './styles';
import { Values } from './props';

export const RegisterMenu = () => {
  const onSubmit = async (
    values: Values,
    { resetForm, setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      await api.post('/menus', values);

      Alert.alert('Sucesso', 'Cadastro com sucesso!');
      resetForm();
    } catch (err) {
      Alert.alert('Erro', 'Erro ao cadastrar');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ name: '' } as Values}
        component={MenuForm}
      />
    </Container>
  );
};
