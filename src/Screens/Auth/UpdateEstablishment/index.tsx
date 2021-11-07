import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { TextInputMasked } from 'react-native-masked-text';
import { useTheme } from 'styled-components/native';

import { EstablishmentForm } from '../../../Components';

import { Container } from './styles';
import { getApi } from '../../../services/api';

export const UpdateEstablishment = ({ navigation }) => {
  const { colors } = useTheme();

  const [loading, setLoading] = useState(true);
  const [establishment, setEstablishment] = useState<any>({
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
  });

  const inputPhoneRef = useRef<TextInputMasked>(null);
  const inputCepRef = useRef<TextInputMasked>(null);
  const inputPriceRef = useRef<TextInputMasked>(null);

  const api = getApi();

  function freightResult(fre: string) {
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

  const getEstablishment = useCallback(async () => {
    try {
      const { data } = await api.post('/establishments/me', { selects: ['full'] });

      const { result: { address, ...rest } } = data;

      setEstablishment({
        ...rest,
        openingTime: rest.openingTime.toString(),
        closingTime: rest.closingTime.toString(),
        freightValue: freightResult(rest.freightValue),
        address: {
          ...address,
          city: address.city.id.toString(),
          state: address.city.state.id.toString()
        }
      });
      setLoading(false);
    } catch (err) {
      Alert.alert('Erro', 'Houve um erro ao buscar dados da sua loja :(', [{
        onPress: () => navigation.goBack(),
        text: 'Ok'
      }]);
    }
  }, []);

  useEffect(() => {
    getEstablishment();
  }, [getEstablishment]);

  const onSubmit = async (values: any) => {
    try {
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

      delete body.image;
      delete body.categories;

      await api.put('/establishments', body);

      Alert.alert('Successo', 'Loja cadastrada com sucesso');
    } catch (err) {
      Alert.alert('Erro', 'Houve um erro ao cadastrar sua loja :(');
    }
  }

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size={40} color={colors.primary} />
      ) : (
        <Formik
          onSubmit={onSubmit}
          initialValues={establishment}
          component={props => <EstablishmentForm {...props} inputPhoneRef={inputPhoneRef} inputCepRef={inputCepRef} inputPriceRef={inputPriceRef} />}
          enableReinitialize
        />
      )}
    </Container>
  )
};
