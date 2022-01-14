import { useRef, useState, useEffect } from 'react';
import { ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import api from '@services/api';
import { useTakePhoto } from '../../hooks/useTakePhoto';
import { Field, Select, FieldMask, FieldError } from '../FormUtils';
import { Button } from '../Button';

import convertUf from './estados';
import { ModalCategories } from './Components';
import { Container, Image, ButtonModal, ContentButton, Label } from './styles';
import { EstablishmentFormProps } from './props';

export const EstablishmentForm = ({
  handleSubmit,
  values,
  handleChange,
  setFieldValue,
  isSubmitting,
  inputCepRef,
  inputPhoneRef,
  inputPriceRef,
}: EstablishmentFormProps) => {
  const takePhoto = useTakePhoto();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    api.get('/states').then(({ data }) =>
      setStates(
        data.result.map((state) => ({
          label: state.name,
          value: String(state.id),
        }))
      )
    );
  }, []);

  useEffect(() => {
    if (values.address.state) {
      api.get(`/cities/${values.address.state}`).then(({ data }) =>
        setCities(
          data.result.map((city) => ({
            label: city.name,
            value: String(city.id),
          }))
        )
      );
    }
  }, [values.address.state]);

  const getCities = async (stateId: number) => {
    const { data } = await api.get(`/cities/${stateId}`);

    const valuesConverted = data.result.map((city) => ({
      label: city.name,
      value: String(city.id),
    }));

    setCities(valuesConverted);

    return valuesConverted;
  };

  const setTime = (value: string, field: string) => {
    if (value === '') {
      setFieldValue(field, value);
      return;
    }

    const convert = Number(value);

    if (convert > 0) setFieldValue(field, value);
  };

  const pickImage = async () => {
    try {
      const encoded = await takePhoto();

      if (encoded) {
        if (values?.id) {
          await api.put('/image', { encoded });

          setFieldValue('image', encoded);
        } else {
          setFieldValue('image', encoded);
        }
      }
    } catch (err) {
      Alert.alert('Erro', 'Parece que houve um erro ao pegar a foto :(');
    }
  };

  const setCategories = (categories: number[]) => {
    setFieldValue('categories', categories);
  };

  const onChangeZipCode = async (value: string) => {
    const valueReplace = value.replace('-', '');

    if (valueReplace.length === 8) {
      try {
        const { data } = await axios.get(
          `https://brasilapi.com.br/api/cep/v2/${valueReplace}`
        );
        const stateConverted = convertUf[data.state];

        const state = states.find((state) => state.label === stateConverted);
        if (!state)
          Alert.alert(
            'Estado não encontrado!',
            'Parece que a flipp não atende nessa região ainda'
          );
        else {
          setFieldValue('address.state', state.value);
          const values = await getCities(state.value);

          const city = values.find((city) => city.label === data.city);
          if (city) setFieldValue('address.city', city.value);
        }

        setFieldValue('address.neighborhood', data.neighborhood);
        setFieldValue('address.street', data.street);
        setFieldValue('address.cep', data.cep);
      } catch (err) {
        Alert.alert('Erro', 'Parece que houve um erro ao buscar o cep');
      }
    }
  };

  const onSubmit = () => handleSubmit();

  return (
    <ScrollView style={{ paddingHorizontal: 30, paddingBottom: 30 }}>
      <ModalCategories
        modalRef={modalRef}
        id={values?.id}
        onPress={setCategories}
        categories={values.categories}
      />
      <Container>
        <TouchableOpacity
          style={{ alignSelf: 'center', paddingVertical: 20 }}
          onPress={pickImage}
        >
          {values.image !== null && values.image !== '' ? (
            <Image source={{ uri: values.image }} />
          ) : (
            <MaterialIcons name="account-circle" size={120} color="#c4c4c4" />
          )}
        </TouchableOpacity>

        <Field
          labelColor="#000"
          label="Nome"
          value={values.name}
          placeholder="Nome da sua loja"
          onChangeText={handleChange('name')}
        />
        <FieldError name="name" />

        <FieldMask
          maskRef={inputPhoneRef}
          type="cel-phone"
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99)',
          }}
          labelColor="#000"
          label="Telefone"
          value={values.cellphone}
          placeholder="número para contato"
          onChangeText={handleChange('cellphone')}
        />
        <FieldError name="cellphone" />

        <Field
          labelColor="#000"
          keyboardType="number-pad"
          label="Horário de abertura (0 - 24)"
          value={values.openingTime}
          placeholder="Horário de abertura"
          onChangeText={(value) => setTime(value, 'openingTime')}
        />
        <FieldError name="openingTime" />

        <Field
          labelColor="#000"
          keyboardType="number-pad"
          label="Horário de fechamento (0 - 24)"
          value={values.closingTime}
          placeholder="Horário de fechamento"
          onChangeText={(value) => setTime(value, 'closingTime')}
        />
        <FieldError name="closingTime" />

        <FieldMask
          maskRef={inputPriceRef}
          type="money"
          labelColor="#000"
          label="Valor do frete"
          value={values.freightValue}
          placeholder="R$3,50"
          onChangeText={handleChange('freightValue')}
        />
        <FieldError name="freightValue" />

        <ButtonModal onPress={() => modalRef.current?.open()}>
          <Label>Categorias</Label>
          <ContentButton>
            <Text style={{ color: '#fff' }}>Selecionar categorias</Text>
          </ContentButton>
        </ButtonModal>
        <FieldError name="categories" />

        <FieldMask
          maskRef={inputCepRef}
          type="zip-code"
          labelColor="#000"
          label="CEP"
          value={values.address.cep}
          placeholder="CEP"
          onChangeText={(value) => onChangeZipCode(value)}
        />
        <FieldError name="address.cep" />

        <Field
          labelColor="#000"
          label="Rua"
          value={values.address.street}
          placeholder="Rua"
          onChangeText={handleChange('address.street')}
        />
        <FieldError name="address.street" />

        <Field
          labelColor="#000"
          label="Número"
          keyboardType="number-pad"
          value={values.address.number}
          placeholder="Número"
          onChangeText={handleChange('address.number')}
        />
        <FieldError name="address.number" />

        <Field
          labelColor="#000"
          label="Bairro"
          value={values.address.neighborhood}
          placeholder="Bairro"
          onChangeText={handleChange('address.neighborhood')}
        />
        <FieldError name="address.neighborhood" />

        <Select
          labelColor="#000"
          label="Estado"
          value={values.address.state}
          placeholder="Estado"
          items={states}
          onChange={(value) => setFieldValue('address.state', value)}
        />
        <FieldError name="address.state" />

        <Select
          labelColor="#000"
          label="Cidade"
          value={values.address.city}
          placeholder="Cidade"
          items={cities}
          onChange={(value) => setFieldValue('address.city', value)}
        />
        <FieldError name="address.city" />

        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          style={{ marginTop: 20 }}
          onPress={onSubmit}
        >
          Salvar
        </Button>
      </Container>
    </ScrollView>
  );
};
