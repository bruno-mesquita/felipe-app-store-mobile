import { useEffect, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useToast } from 'native-base';

import api from '@services/api';
import { MenuForm } from '../../../Components';

import { Container } from './styles';
import getChangedValues from '@utils/getChangedValues';

export const UpdateMenu = ({ route }) => {
  const toast = useToast();

  const [menu, setMenu] = useState({ id: '', name: '', active: true });

  useEffect(() => {
    api
      .get(`/menus/${route.params.id}`)
      .then(({ data }) => setMenu(data.result))
      .catch(() => {
        toast.show({
          title: 'Erro',
          description: 'Erro ao buscar categoria',
          w: '90%',
          alignSelf: 'center',
          status: 'error',
        });
      });
  }, []);

  const onSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
    try {
      const body = getChangedValues(values, menu);

      if (Object.keys(body).length > 0) {
        await api.put(`/menus/${route.params.id}`, body);

        toast.show({
          title: 'Sucesso',
          description: 'Categoria atualizada!',
        });
      }

      toast.show({
        title: 'Aviso',
        description: 'Nada para atualizar',
      });
    } catch (err) {
      toast.show({
        title: 'Erro',
        description: 'Houve um erro ao atualizar',
        status: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={menu}
        component={MenuForm}
        enableReinitialize
      />
    </Container>
  );
};
