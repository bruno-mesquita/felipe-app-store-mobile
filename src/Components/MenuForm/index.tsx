import type { FormikProps } from 'formik';
import { Checkbox, Flex } from 'native-base';

import { Button } from '../Button';
import { Field, FieldError } from '../FormUtils';

import type { Values } from './props';

export const MenuForm = ({
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  setFieldValue,
}: FormikProps<Values>) => {
  return (
    <Flex flex={1} px="25px" justify="space-around" align="center">
      <Flex align="center" h="20%" justify="space-around">
        <Field
          label="Nome"
          labelColor="#000"
          value={values.name}
          onChangeText={handleChange('name')}
        />
        <FieldError name="name" />

        <Checkbox
          isChecked={values.active}
          onChange={(value) => setFieldValue('active', value)}
        >
          Ativado
        </Checkbox>
      </Flex>

      <Button loading={isSubmitting} onPress={() => handleSubmit()}>
        Salvar
      </Button>
    </Flex>
  );
};
