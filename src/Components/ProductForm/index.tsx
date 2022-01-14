import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Field, Select, FieldError, FieldMask } from '../FormUtils';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { useTakePhoto } from '../../hooks';

import {
  Container,
  Fields,
  ViewButton,
  Image,
  ViewImage,
  CheckboxContainer,
} from './styles';
import { ProductFormProps } from './props';
import api from '@services/api';

export const ProductForm = ({
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  inputPriceRef,
}: ProductFormProps) => {
  const pickImage = useTakePhoto();

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    api.get('/menus').then(({ data }) =>
      setMenus(
        data.result.map((menu) => ({
          label: menu.name,
          value: String(menu.id),
        }))
      )
    );
  }, []);

  const takeImage = async () => {
    const encoded = await pickImage();

    if (encoded) setFieldValue('image', encoded);
  };

  return (
    <Container>
      <ViewImage onPress={takeImage}>
        {values.image ? (
          <Image source={{ uri: values.image }} resizeMode="cover" />
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
            suffixUnit: '',
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
          label="Categoria"
          items={menus}
          placeholder="Selecione uma categoria"
          labelColor="#000"
          value={String(values.menu)}
          onChange={(value) => setFieldValue('menu', value)}
        />
        <FieldError name="menu" />
        <CheckboxContainer>
          <Checkbox
            checked={values.active}
            onChange={(value) => setFieldValue('active', value)}
          >
            Ativado
          </Checkbox>
        </CheckboxContainer>
      </Fields>

      <ViewButton>
        <Button loading={isSubmitting} onPress={() => handleSubmit()}>
          {values.id ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </ViewButton>
    </Container>
  );
};
