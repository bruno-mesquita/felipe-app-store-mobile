import { Formik, FormikHelpers } from 'formik';
import { useToast } from 'native-base';

import { MenuForm } from '../../../Components';
import api from '@services/api';

import type { Values } from './props';

export const RegisterMenu = () => {
  const toast = useToast();

  const onSubmit = async (values: Values, { resetForm }: FormikHelpers<Values>) => {
    try {
      await api.post('/menus', values);

      toast.show({
        title: 'Sucesso',
        description: 'Cadastro com sucesso!',
      });
      resetForm();
    } catch (err) {
      toast.show({
        title: 'Erro',
        description: err.response.data.message,
        status: 'error',
      });
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ name: '', active: true, priority: 1 } as Values}
      component={MenuForm}
    />
  );
};
