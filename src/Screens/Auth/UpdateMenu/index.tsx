import { Formik } from 'formik';
import { useToast } from 'native-base';

import api from '@services/api';
import { MenuForm } from '../../../Components';

import getChangedValues from '@utils/getChangedValues';
import useGetMenu, { IMenu } from '@hooks-api/useGetMenu';

export const UpdateMenu = ({ route }) => {
  const toast = useToast();

  const { data, mutate } = useGetMenu(route.params.id);

  const onSubmit = async (values: IMenu) => {
    try {
      const body = getChangedValues(values, data);

      if (Object.values(body).length > 0) {
        await api.put(`/menus/${route.params.id}`, values);
        mutate(values, false);

        toast.show({
          title: 'Sucesso',
          description: 'Categoria atualizada!',
        });
      }
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
      initialValues={data}
      component={MenuForm}
      enableReinitialize
    />
  );
};
