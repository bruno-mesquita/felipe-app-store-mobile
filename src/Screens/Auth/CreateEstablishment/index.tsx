import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { TextInputMasked } from 'react-native-masked-text';

import { EstablishmentForm } from '../../../Components';
import { requestEstablishmentExistsSuccess } from '../../../Store/ducks/auth/auth.actions';
import { getApi } from '../../../services/api';

import { Container } from './styles';
import { schema } from './schema';

export const CreateEstablishment = ({ navigation }) => {
  const dispatch = useDispatch();

  const inputPhoneRef = useRef<TextInputMasked>(null);
  const inputCepRef = useRef<TextInputMasked>(null);
  const inputPriceRef = useRef<TextInputMasked>(null);

  const initialValues = {
    name: '',
    cellphone: '',
    openingTime: '',
    closingTime: '',
    freightValue: '',
    categories: [],
    image: '',
    active: true,
    address: {
      street: '',
      number: '',
      neighborhood: '',
      state: '',
      city: '',
      cep: ''
    },
  };

  const ok = () => {
    dispatch(requestEstablishmentExistsSuccess(true));
    navigation.navigate('Dashboard')
  }

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const api = getApi();

      const body = {
        ...values,
        cellphone: inputPhoneRef.current?.getRawValue(),
        freightValue: inputPriceRef.current?.getRawValue(),
        address: {
          ...values.address,
          cep: inputCepRef.current?.getRawValue(),
          city: Number(values.address.city)
        },
        closingTime: Number(values.closingTime),
        openingTime: Number(values.openingTime)
      }

      await api.post('/establishments', body);

      Alert.alert('Successo', 'Loja cadastrada com sucesso', [{
        onPress: ok,
        text: 'Ok'
      }]);
    } catch (err) {
      console.log(err.response.data);
      Alert.alert('Erro', 'Houve um erro ao cadastrar sua loja :(');
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        component={props => <EstablishmentForm {...props} inputPhoneRef={inputPhoneRef} inputCepRef={inputCepRef} inputPriceRef={inputPriceRef} />}
        validationSchema={schema}
        enableReinitialize
      />
    </Container>
  )
};
