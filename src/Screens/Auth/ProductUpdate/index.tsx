import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { TextInputMasked } from 'react-native-masked-text';

import { ProductForm } from '../../../Components';

import { Container } from './styles';
import { getApi } from '../../../services/api';
import schema from './schema';

export const ProductUpdate = ({ route, navigation }) => {
  const inputPriceRef = useRef<TextInputMasked>(null);

  const [product, setProduct] = useState({
    _id: '',
    name: '',
    price: '',
    description: '',
    menu: 0,
    image: null,
    active: false,
  });

  const getProduct = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get(`/products/${route.params.id}`);

      const { result } = data;

      setProduct({ ...result, image: result.photo.encoded, menu: result.menu_id });
    } catch (err) {
      console.log(err);
      Alert.alert('Erro', 'Erro ao pegar dados do produto', [
        {
          text: 'Sair',
          onPress: () => navigation.goBack(),
        }
      ]);
    }
  }, [])

  useEffect(() => {
    getProduct();
  }, [getProduct])

  const onSubmit = async (values, { setSubmitting }: FormikHelpers<any>) => {
    try {
      const api = getApi();

      await api.put(`/products/${route.params.id}`, values);

      setSubmitting(false);
      Alert.alert('Sucesso', 'Produto atualizado com sucesso');
    } catch (err) {
      setSubmitting(false);
      Alert.alert('Erro', 'Erro ao atualizar o produto');
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={product}
        component={(props) => <ProductForm {...props} inputPriceRef={inputPriceRef} />}
        validationSchema={schema}
        enableReinitialize
      />
    </Container>
  )
}
