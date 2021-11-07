import { useCallback, useEffect, useState, useRef } from 'react';
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

  function PriceResult(fre: string) {
    switch(fre.length) {
      case 2: {
        return Number(fre + '');
        break;
      }
      case 3: {
        return  Number(fre + '00');
        break;
      }
      default: {
        return fre;
        break;
      }
    }
  };

  const getProduct = useCallback(async () => {
    try {
      const api = getApi();

      const { data: { result } } = await api.get(`/products/${route.params.id}`);

      setProduct({
        ...result,
        price: PriceResult(result.price),
        image: result.photo.encoded,
        menu: result.menu_id
      });
    } catch (err) {
      Alert.alert('Erro', 'Erro ao pegar dados do produto', [
        {
          text: 'Sair',
          onPress: () => navigation.goBack(),
        }
      ]);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const onSubmit = async (values, { setSubmitting }: FormikHelpers<any>) => {
    try {
      const api = getApi();

      const body = {
        ...values,
        price: inputPriceRef.current?.getRawValue(),
      }

      await api.put(`/products/${route.params.id}`, body);

      Alert.alert('Sucesso', 'Produto atualizado com sucesso');
    } catch (err) {
      Alert.alert('Erro', 'Erro ao atualizar o produto');
    } finally {
      setSubmitting(false);
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
