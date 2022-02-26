import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Flex,
  Input,
  FormControl,
  Pressable,
  Button,
  TextArea,
  Checkbox,
  Select,
} from 'native-base';
import { ErrorMessage } from 'formik';
import type { FormikProps } from 'formik';

import type { IProduct } from '@hooks-api/useGetProduct';
import formatNumber from '@utils/format-number';
import { FastImage } from '../FastImage';
import { useTakePhoto } from '../../hooks';

import useGetMenus from '@hooks-api/useGetMenus';

export const ProductForm = ({
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  setFieldValue,
}: FormikProps<IProduct>) => {
  const pickImage = useTakePhoto();

  const { data: menus } = useGetMenus();

  const takeImage = async () => {
    const encoded = await pickImage();

    if (encoded) setFieldValue('image', encoded);
  };

  return (
    <ScrollView>
      <Flex flex={1} mt="10px" justify="center" align="center" py="50px" px="20px">
        <Pressable
          w="43%"
          h="20%"
          borderWidth="1px"
          borderColor="#c4c4c4"
          rounded="100px"
          justifyContent="center"
          alignItems="center"
          onPress={takeImage}
        >
          {values.image ? (
            <FastImage
              cacheKey={values.name}
              w="150px"
              h="150px"
              rounded="100px"
              source={{ uri: values.image }}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="camera" size={50} color="#c4c4c4" />
          )}
        </Pressable>

        <FormControl mt="10px">
          <FormControl.Label>Nome</FormControl.Label>
          <Input
            placeholder="Nome"
            value={values.name}
            onChangeText={handleChange('name')}
          />
          <ErrorMessage name="name" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Preço - {formatNumber(values.price)}</FormControl.Label>
          <Input
            keyboardType="number-pad"
            placeholder="Preço"
            value={values.price.toString()}
            onChangeText={handleChange('price')}
          />
          <ErrorMessage name="price" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Descrição</FormControl.Label>
          <TextArea
            value={values.description}
            onChangeText={handleChange('description')}
          />
          <ErrorMessage name="description" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl mt="10px">
          <FormControl.Label>Categoria</FormControl.Label>
          <Select
            placeholder="Selecione uma categoria"
            selectedValue={values.menu}
            onValueChange={handleChange('menu')}
          >
            {menus?.map(({ name, id }) => (
              <Select.Item label={name} value={id.toString()} key={id.toString()} />
            ))}
          </Select>
          <ErrorMessage name="menu" component={FormControl.ErrorMessage} />
        </FormControl>

        <Flex direction="row" mb="20px" mt="10px" justify="space-between" w="100%">
          <FormControl w="45%">
            <FormControl.Label>Unidade</FormControl.Label>
            <Input
              placeholder="Unidade"
              value={values.unit.toString()}
              onChangeText={handleChange('unit')}
            />
            <ErrorMessage name="unit" component={FormControl.ErrorMessage} />
          </FormControl>

          <FormControl w="45%">
            <FormControl.Label>Tipo de unidade</FormControl.Label>
            <Select
              placeholder="Tipo"
              selectedValue={values.unitType}
              onValueChange={handleChange('unitType')}
            >
              <Select.Item label="Unidade" value="Un" />
              <Select.Item label="Gramas" value="gr" />
              <Select.Item label="Kilogramas" value="Kg" />
            </Select>
            <ErrorMessage name="unit" component={FormControl.ErrorMessage} />
          </FormControl>
        </Flex>

        <Checkbox
          name="active"
          isChecked={values.active}
          onChange={() => setFieldValue('active', !values.active)}
        >
          Ativado
        </Checkbox>

        <Button
          mt="20px"
          w="70%"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          onPress={() => handleSubmit()}
        >
          Salvar
        </Button>
      </Flex>
    </ScrollView>
  );
};
