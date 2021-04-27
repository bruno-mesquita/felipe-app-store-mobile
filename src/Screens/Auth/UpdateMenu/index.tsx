import React, { useEffect, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import { MenuForm } from '../../../Components';
import api from '../../../services/api';

import { Container } from './styles';

export const UpdateMenu = ({ route }) => {
  const [menu, setMenu] = useState({ id: '', name: '' });

  const getMenu = useCallback(async () => {
    try {
      const { data } = await api.get(`/menus/${route.params.id}`);

      setMenu(data.result);
    } catch (err) {
      Alert.alert('Erro ao buscar dados do cardápio');
    }
  }, []);

  useEffect(() => {
    getMenu()
  }, [getMenu])

  const onSubmit = async (values, { setSubmitting }: FormikHelpers<any>) => {
    try {
      await api.put(`/menus/${route.params.id}`, values);

      setSubmitting(false);
      Alert.alert('Atualizado com sucesso!')
    } catch (err) {
      console.log(err.response);

      setSubmitting(false);
      Alert.alert('Erro ao atualizar')
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
