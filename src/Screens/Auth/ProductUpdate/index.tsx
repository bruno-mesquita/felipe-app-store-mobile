import { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { TextInputMasked } from 'react-native-masked-text';

import formatNumber from '@utils/format-number';
import api from '@services/api';
import getChangedValues from '@utils/getChangedValues';

import { ProductForm } from '../../../Components';

import { Container } from './styles';

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

  useEffect(() => {
    api
      .get(`/products/${route.params.id}`)
      .then(({ data: { result } }) => {
        const { photo, menu_id, price, ...rest } = result;

        setProduct({
          ...rest,
          price: formatNumber(price),
          image: photo.encoded,
          menu: menu_id,
        });
      })
      .catch(() => {
        Alert.alert('Erro', 'Erro ao pegar dados do produto', [
          {
            text: 'Sair',
            onPress: () => navigation.goBack(),
          },
        ]);
      });
  }, []);

  const onSubmit = async (values, { setSubmitting }: FormikHelpers<any>) => {
    try {
      const body = getChangedValues(
        {
          ...values,
          price: inputPriceRef.current?.getRawValue(),
        },
        product
      );
      await api.put(`/products/${route.params.id}`, body);

      Alert.alert('Sucesso', 'Produto atualizado com sucesso');
    } catch (err) {
      Alert.alert('Erro', 'Erro ao atualizar o produto');
    } finally {
      setSubmitting(false);
    }
  };

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
  );
};
