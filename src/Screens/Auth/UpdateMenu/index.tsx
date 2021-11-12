import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import api from '@services/api';
import { MenuForm } from '../../../Components';

import { Container } from './styles';

export const UpdateMenu = ({ route }) => {
  const [menu, setMenu] = useState({ id: '', name: '' });

  useEffect(() => {
    api.get(`/menus/${route.params.id}`)
      .then(({ data }) => setMenu(data.result))
      .catch(() => Alert.alert('Erro ao buscar dados do cardápio'));
  }, [])

  const onSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
    try {
      await api.put(`/menus/${route.params.id}`, values);

      Alert.alert('Atualizado com sucesso!')
    } catch (err) {
      Alert.alert('Erro', 'Houve um erro ao atualizar')
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={menu}
        component={MenuForm}
        enableReinitialize
      />
    </Container>
  )
}
