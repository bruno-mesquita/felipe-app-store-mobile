import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Field, Select, FieldError, FieldMask } from '../FormUtils';
import { Button } from '../Button';
import { usePermissionGallery } from '../../hooks/permissions';
import { useTakePhoto } from '../../hooks';

import { Container, Fields, ViewButton, Image, ViewImage } from './styles';
import { Values, ProductFormProps } from './props';

export const ProductForm = ({ values, handleChange, handleSubmit, isSubmitting, setFieldValue, inputPriceRef }: ProductFormProps) => {
  const permission = usePermissionGallery();
  const pickImage = useTakePhoto();

  const takeImage = async () => {
    const encoded = await pickImage();

    if(encoded) setFieldValue('image', encoded);
  }

  return (
    <Container>
      <ViewImage disabled={!permission} onPress={takeImage}>
        {values.image ? (
          <Image source={{ uri: values.image }} resizeMode="contain" />
        ) : (
          <Ionicons name="camera" size={40} color="#c4c4c4" />
        )}
      </ViewImage>
      <FieldError name="image" />

      <Fields>
        <Field
          label="Nome"
          labelColor="#000"
          value={values.name}
          onChangeText={handleChange('name')}
        />
        <FieldError name="name" />

        <FieldMask
          type="money"
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: ''
          }}
          label="Preço"
          labelColor="#000"
          value={values.price}
          onChangeText={handleChange('price')}
          maskRef={inputPriceRef}
        />
        <FieldError name="price" />

        <Field
          label="Descrição"
          labelColor="#000"
          value={values.description}
          onChangeText={handleChange('description')}
        />
        <FieldError name="description" />

        <Select
          label="Cardápio"
          path="/menus"
          placeholder="Selecione um cardápio"
          labelColor="#000"
          value={String(values.menu)}
          onChange={handleChange('menu')}
        />
        <FieldError name="menu" />
      </Fields>

      <ViewButton>
        <Button loading={isSubmitting} onPress={() => handleSubmit()}>{values.id ? 'Atualizar' : 'Cadastrar'}</Button>
      </ViewButton>
    </Container>
  )
}
