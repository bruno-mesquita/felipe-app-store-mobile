import type { FormikProps } from 'formik';
import { Checkbox, Flex, FormControl, Input, Button } from 'native-base';
import { ErrorMessage } from 'formik';

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
      <Flex align="center" w="100%" h="20%" justify="space-around">
        <FormControl>
          <FormControl.Label>Nome</FormControl.Label>
          <Input
            value={values.name}
            onChangeText={handleChange('name')}
            placeholder="Nome da categoria"
          />
          <ErrorMessage name="name" component={FormControl.ErrorMessage} />
        </FormControl>

        <Checkbox
          isChecked={values.active}
          onChange={(value) => setFieldValue('active', value)}
        >
          Ativado
        </Checkbox>
      </Flex>

      <Button
        w="60%"
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        onPress={() => handleSubmit()}
      >
        Salvar
      </Button>
    </Flex>
  );
};
