import { useState, useEffect, useRef } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { TextInputMasked } from 'react-native-masked-text';
import { useTheme } from 'styled-components/native';
import { useToast } from 'native-base';

import api from '@services/api';
import { EstablishmentForm } from '../../../Components';

import { Container } from './styles';

export const UpdateEstablishment = () => {
  const { colors } = useTheme();
  const toast = useToast();

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
      cep: '',
    },
  });

  const inputPhoneRef = useRef<TextInputMasked>(null);
  const inputCepRef = useRef<TextInputMasked>(null);

  useEffect(() => {
    api
      .post('/establishments/me', { selects: ['full'] })
      .then(({ data }) => {
        const {
          result: { address, ...rest },
        } = data;

        setEstablishment({
          ...rest,
          openingTime: rest.openingTime.toString(),
          closingTime: rest.closingTime.toString(),
          address: {
            ...address,
            city: address.city.id.toString(),
            state: address.city.state.id.toString(),
          },
        });
      })
      .catch((err) => {
        Alert.alert('Erro', 'Houve um erro ao buscar dados da sua loja :(', [
          {
            text: 'Ok',
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async ({
    image,
    categories,
    address,
    closingTime,
    openingTime,
    ...values
  }: any) => {
    try {
      const body = {
        ...values,
        cellphone: inputPhoneRef.current?.getRawValue(),
        address: {
          ...address,
          cep: inputCepRef.current?.getRawValue(),
          city: Number(address.city),
        },
        closingTime: Number(closingTime),
        openingTime: Number(openingTime),
      };

      await api.put('/establishments', body);

      toast.show({ title: 'Successo', description: 'Loja atualizada com sucesso' });
    } catch (err) {
      toast.show({
        title: 'Erro',
        description: 'Houve um erro ao atualizar sua loja :(',
        status: 'error',
      });
    }
  };

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size={40} color={colors.primary} />
      ) : (
        <Formik
          onSubmit={onSubmit}
          initialValues={establishment}
          component={(props) => (
            <EstablishmentForm
              {...props}
              inputPhoneRef={inputPhoneRef}
              inputCepRef={inputCepRef}
            />
          )}
          enableReinitialize
        />
      )}
    </Container>
  );
};
