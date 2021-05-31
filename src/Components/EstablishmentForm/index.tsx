import React, { useRef } from 'react';
import { ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


import { useTakePhoto } from '../../hooks/useTakePhoto'
import { usePermissionGallery } from '../../hooks/permissions';
import { Field, Select, FieldMask, FieldError } from '../FormUtils';
import { Button } from '../Button';

import { ModalCategories } from './Components';
import { Container, Image, ButtonModal, ContentButton, Label } from './styles';
import { EstablishmentFormProps } from './props';
import { getApi } from '../../services/api';

export const EstablishmentForm = ({
  handleSubmit, values, handleChange, setFieldValue, isSubmitting, inputCepRef, inputPhoneRef, inputPriceRef
 }: EstablishmentFormProps) => {
  const takePhoto = useTakePhoto();
  const permission = usePermissionGallery();

  const modalRef = useRef(null);

  const setTime = (value: string, field: string) => {
    if(value === '') {
      setFieldValue(field, value);
      return;
    }

    const convert = Number(value);

    if(convert > 0) setFieldValue(field, value);
  }

  const onSubmit = () => handleSubmit();

  const pickImage = async () => {
    try {
      const encoded = await takePhoto();

      if(encoded) {
        if(values?.id) {
          const api = getApi();

          await api.put('/image', { encoded });

          setFieldValue('image', encoded);
        } else {
          setFieldValue('image', encoded);
        }
      };
    } catch (err) {
      console.log(err.response.data);
      Alert.alert('Erro', 'Parece que houve um erro ao pegar a foto :(')
    }
  }

  const setCategories = (categories: number[]) => {
    setFieldValue('categories', categories);
  }

  return (
    <ScrollView style={{ paddingHorizontal: 30, paddingBottom: 30 }}>
      <ModalCategories modalRef={modalRef} id={values?.id} onPress={setCategories} categories={values.categories} />
    <Container>
      <TouchableOpacity style={{ alignSelf: 'center', paddingVertical: 20 }} disabled={!permission} onPress={pickImage}>
        {values.image !== '' ? (
          <Image source={{ uri: values.image }} />
        ) : (
          <MaterialIcons
            name="account-circle"
            size={120}
            color="#c4c4c4"
          />
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

        <Field
          labelColor="#000"
          label="Logradouro"
          value={values.address.street}
          placeholder="Logradouro"
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

        <FieldMask
          maskRef={inputCepRef}
          type="zip-code"
          labelColor="#000"
          label="CEP"
          value={values.address.cep}
          placeholder="CEP"
          onChangeText={handleChange('address.cep')}
        />
        <FieldError name="address.cep" />

        <Select
          labelColor="#000"
          label="Estado"
          value={values.address.state}
          placeholder="Estado"
          onChange={handleChange('address.state')}
          path="/states"
        />
        <FieldError name="address.state" />

        <Select
          labelColor="#000"
          label="Cidade"
          value={values.address.city}
          placeholder="Cidade"
          onChange={handleChange('address.city')}
          path={`/cities/${values.address.state}`}
        />
        <FieldError name="address.city" />

        <Button disabled={isSubmitting} loading={isSubmitting} style={{ marginTop: 20 }} onPress={onSubmit}>Salvar</Button>
      </Container>
    </ScrollView>
  )
};
