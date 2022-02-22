import { Formik } from 'formik';
import { useToast } from 'native-base';

import api from '@services/api';
import getChangedValues from '@utils/getChangedValues';
import useGetProduct, { IProduct } from '@hooks-api/useGetProduct';

import { ProductForm } from '../../../Components';
import schema from './schema';

export const ProductUpdate = ({ route }) => {
  const toast = useToast();

  const { product } = useGetProduct(route.params.id);

  const onSubmit = async (values: IProduct) => {
    try {
      const body = getChangedValues(values, product);

      await api.put(`/products/${route.params.id}`, body);

      toast.show({
        title: 'Sucesso!',
        description: 'Produto atualizado com sucesso',
      });
    } catch (err) {
      const { type = 'Erro', message = 'Erro ao atualizar produto' } = err.response.data;

      toast.show({
        title: type,
        description: message,
        status: 'error',
      });
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={product}
      component={ProductForm}
      validationSchema={schema}
      enableReinitialize
    />
  );
};
