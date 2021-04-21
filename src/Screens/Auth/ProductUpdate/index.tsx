import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import { ProductForm } from '../../../Components';

import { Container } from './styles';
import api from '../../../services/api';
import schema from './schema';

export const ProductUpdate = ({ route }) => {
  const [product, setProduct] = useState({
    _id: '',
    name: '',
    price: '',
    description: '',
    menu: 0,
    image: null,
  });

  const getProduct = useCallback(async () => {
    try {
      const { data } = await api.get(`/products/${route.params.id}`);

      setProduct(data.data);
    } catch (err) {
      Alert.alert('Erro ao pegar dados do produto');
    }
  }, [])

  useEffect(() => {
    getProduct();
  }, [getProduct])

  const onSubmit = async (values, { setSubmitting }: FormikHelpers<any>) => {
    try {
      await api.post(`/products/${route.params.id}`, values);

      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      Alert.alert('Erro ao atualizar o produto');
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={product}
        component={ProductForm}
        validationSchema={schema}
        enableReinitialize
      />
    </Container>
  )
}
