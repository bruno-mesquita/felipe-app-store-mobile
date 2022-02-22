import { Formik, FormikHelpers } from 'formik';
import { useToast } from 'native-base';

import api from '@services/api';
import { ProductForm } from '../../../Components';

import type { IValues } from './types';
import schema from './schema';

export const ProductRegistration = () => {
  const toast = useToast();

  const initialValues: IValues = {
    name: '',
    price: 0,
    description: '',
    menu: '0',
    image: null,
    active: false,
    unit: 1,
    unitType: 'Un',
  };

  const onSubmit = async (
    { menu, ...values }: IValues,
    { resetForm }: FormikHelpers<IValues>
  ) => {
    try {
      const body = {
        ...values,
        menu: Number(menu),
      };

      await api.post('/products', body);

      toast.show({
        title: 'Sucesso!',
        description: 'Produto cadastrado com sucesso',
      });
      resetForm();
    } catch (err) {
      toast.show({
        title: 'Erro!',
        description: err.response.data.message,
        status: 'error',
      });
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      component={ProductForm}
      validationSchema={schema}
    />
  );
};
