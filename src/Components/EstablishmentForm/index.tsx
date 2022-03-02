import { useRef } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import {
  Checkbox,
  Button,
  Select,
  FormControl,
  useToast,
  Input,
  Flex,
} from 'native-base';
import { ErrorMessage } from 'formik';

import api from '@services/api';
import formatNumber from '@utils/format-number';
import useGetStates from '@hooks-api/useGetStates';
import useGetCitiesByState from '@hooks-api/useGetCitiesByState';

import { useTakePhoto } from '../../hooks/useTakePhoto';
import { FieldMask } from '../FormUtils';

import convertUf from './estados';
import { ModalCategories } from './Components';
import { EstablishmentFormProps } from './props';
import { FastImage } from '../FastImage';

export const EstablishmentForm = ({
  handleSubmit,
  values,
  handleChange,
  setFieldValue,
  isSubmitting,
  inputCepRef,
  inputPhoneRef,
}: EstablishmentFormProps) => {
  const toast = useToast();
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
        if (values?.id) await api.put('/image', { encoded });
        setFieldValue('image', encoded);
      }
    } catch (err) {
      toast.show({
        title: 'Erro',
        description: 'Parece que houve um erro ao pegar a foto :(',
        status: 'error',
      });
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

        const state = states.find((state) => state.name === stateConverted);
        if (!state) {
          toast.show({
            title: 'Estado não encontrado!',
            description: 'Parece que a flipp não atende nessa região ainda',
            status: 'error',
          });
        } else {
          setFieldValue('address.state', state.id);

          const city = cities.find((city) => city.name === data.city);
          if (city) setFieldValue('address.city', city.id);
        }

        setFieldValue('address.neighborhood', data.neighborhood);
        setFieldValue('address.street', data.street);
        setFieldValue('address.cep', data.cep);
      } catch (err) {
        toast.show({
          title: 'Erro',
          description: 'Parece que houve um erro ao buscar o cep',
          status: 'error',
        });
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
      <Flex flex={1} justify="center" align="center">
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

        <FormControl mt="10px">
          <FormControl.Label>Nome</FormControl.Label>
          <Input
            value={values.name}
            placeholder="Nome da sua loja"
            onChangeText={handleChange('name')}
          />
          <ErrorMessage name="name" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Celular</FormControl.Label>
          <FieldMask
            maskRef={inputPhoneRef}
            type="cel-phone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99)',
            }}
            value={values.cellphone}
            placeholder="número para contato"
            onChangeText={handleChange('cellphone')}
          />
          <ErrorMessage name="cellphone" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Horário de abertura (0 - 24)</FormControl.Label>
          <Input
            keyboardType="number-pad"
            value={values.openingTime}
            placeholder="Horário de abertura"
            onChangeText={(value) => setTime(value, 'openingTime')}
          />
          <ErrorMessage name="openingTime" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Horário de fechamento (0 - 24)</FormControl.Label>
          <Input
            keyboardType="number-pad"
            value={values.closingTime}
            placeholder="Horário de fechamento"
            onChangeText={(value) => setTime(value, 'closingTime')}
          />
          <ErrorMessage name="closingTime" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>{`Valor do frete - ${formatNumber(
            values.freightValue
          )}`}</FormControl.Label>
          <Input
            value={values.freightValue}
            placeholder="R$3,50"
            keyboardType="number-pad"
            onChangeText={handleChange('freightValue')}
          />
          <ErrorMessage name="freightValue" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>CEP</FormControl.Label>
          <FieldMask
            maskRef={inputCepRef}
            type="zip-code"
            value={values.address.cep}
            placeholder="CEP"
            onChangeText={(value) => onChangeZipCode(value)}
          />
          <ErrorMessage name="address.cep" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Rua</FormControl.Label>
          <Input
            value={values.address.street}
            placeholder="Bairro"
            onChangeText={handleChange('address.street')}
          />
          <ErrorMessage name="address.street" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Número</FormControl.Label>
          <Input
            keyboardType="number-pad"
            value={values.address.number}
            placeholder="Bairro"
            onChangeText={handleChange('address.number')}
          />
          <ErrorMessage name="address.number" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Bairro</FormControl.Label>
          <Input
            value={values.address.neighborhood}
            placeholder="Bairro"
            onChangeText={handleChange('address.neighborhood')}
          />
          <ErrorMessage
            name="address.neighborhood"
            component={FormControl.ErrorMessage}
          />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Estado</FormControl.Label>
          <Select
            placeholder="Estado"
            selectedValue={values.address.state}
            onValueChange={(value) => setFieldValue('address.state', value)}
          >
            {states?.map(({ id, name }) => (
              <Select.Item label={name} key={id} value={id.toString()} />
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
              <Select.Item label={name} key={id} value={id.toString()} />
            ))}
          </Select>
          <ErrorMessage name="address.city" component={FormControl.ErrorMessage} />
        </FormControl>

        <Flex direction="row" w="80%" align="center" justify="space-between">
          <Button onPress={() => modalRef.current?.open()} alignSelf="flex-start">
            categorias
          </Button>
          <Checkbox
            accessibilityLabel="ativado"
            isChecked={values.active}
            onChange={() => setFieldValue('active', !values.active)}
          >
            Ativado
          </Checkbox>
        </Flex>

        <Button
          w="70%"
          my="20px"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          onPress={onSubmit}
        >
          Salvar
        </Button>
      </Flex>
    </ScrollView>
  );
};
