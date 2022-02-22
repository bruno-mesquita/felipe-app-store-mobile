import { useRef } from 'react';
import { Formik } from 'formik';
import { TextInputMasked } from 'react-native-masked-text';
import { useToast } from 'native-base';

import { useAppDispatch } from '@store/hooks';
import { authActions } from '@store/reducers/auth';
import api from '@services/api';

import { EstablishmentForm } from '../../../Components';
import { Container } from './styles';
import { schema } from './schema';

export const CreateEstablishment = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const inputPhoneRef = useRef<TextInputMasked>(null);
  const inputCepRef = useRef<TextInputMasked>(null);

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
      cep: '',
    },
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const body = {
        ...values,
        cellphone: inputPhoneRef.current?.getRawValue(),
        address: {
          ...values.address,
          cep: inputCepRef.current?.getRawValue(),
          city: Number(values.address.city),
        },
        closingTime: Number(values.closingTime),
        openingTime: Number(values.openingTime),
      };

      await api.post('/establishments', body);
      dispatch(authActions.setEstablishmentExists(true));
      navigation.navigate('Dashboard');

      toast.show({
        title: 'Sucesso!',
        description: 'Loja cadastrada com sucesso',
      });
    } catch (err) {
      toast.show({
        title: 'Erro!',
        description: 'Houve um erro ao cadastrar sua loja :(',
      });
    }
  };

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        component={(props) => (
          <EstablishmentForm
            {...props}
            inputPhoneRef={inputPhoneRef}
            inputCepRef={inputCepRef}
          />
        )}
        validationSchema={schema}
        enableReinitialize
      />
    </Container>
  );
};
