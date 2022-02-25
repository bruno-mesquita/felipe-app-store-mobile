import { useRef } from 'react';
import { ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Checkbox, Button, Select, FormControl } from 'native-base';
import { ErrorMessage } from 'formik';

import api from '@services/api';
import { useTakePhoto } from '../../hooks/useTakePhoto';
import { Field, FieldMask, FieldError } from '../FormUtils';

import convertUf from './estados';
import { ModalCategories } from './Components';
import { Container, ButtonModal, ContentButton, Label } from './styles';
import { EstablishmentFormProps } from './props';
import { FastImage } from '../FastImage';
import formatNumber from '@utils/format-number';
import useGetStates from '@hooks-api/useGetStates';
import useGetCitiesByState from '@hooks-api/useGetCitiesByState';

export const EstablishmentForm = ({
  handleSubmit,
  values,
  handleChange,
  setFieldValue,
  isSubmitting,
  inputCepRef,
  inputPhoneRef,
}: EstablishmentFormProps) => {
  const takePhoto = useTakePhoto();

  const { data: states } = useGetStates();
  const { data: cities } = useGetCitiesByState(values.address.state);

  const modalRef = useRef(null);

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
            <FastImage
              rounded="100px"
              size="120px"
              cacheKey={values.name}
              source={{ uri: values.image }}
            />
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

        <Field
          keyboardType="number-pad"
          labelColor="#000"
          label={`Valor do frete - ${formatNumber(values.freightValue)}`}
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

        <FormControl mt="10px">
          <FormControl.Label>Estado</FormControl.Label>
          <Select
            placeholder="Estado"
            selectedValue={values.address.state}
            onValueChange={(value) => setFieldValue('address.state', value)}
          >
            {states?.map(({ id, name }) => (
              <Select.Item label={name} key={id.toString()} value={id.toString()} />
            ))}
          </Select>
          <ErrorMessage name="address.state" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl my="10px">
          <FormControl.Label>Cidade</FormControl.Label>
          <Select
            placeholder="Cidade"
            selectedValue={values.address.city}
            onValueChange={(value) => setFieldValue('address.city', value)}
          >
            {cities?.map(({ id, name }) => (
              <Select.Item label={name} key={id.toString()} value={id.toString()} />
            ))}
          </Select>
          <ErrorMessage name="address.city" component={FormControl.ErrorMessage} />
        </FormControl>

        <Checkbox
          accessibilityLabel="ativado"
          isChecked={values.active}
          onChange={() => setFieldValue('active', !values.active)}
        >
          Ativado
        </Checkbox>

        <Button
          w="70%"
          my="20px"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          onPress={onSubmit}
        >
          Salvar
        </Button>
      </Container>
    </ScrollView>
  );
};
