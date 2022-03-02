import type { FormikProps } from 'formik';
import { Checkbox, Flex, FormControl, Input, Button } from 'native-base';
import { ErrorMessage } from 'formik';

import type { IMenu } from '@hooks-api/useGetMenu';

export const MenuForm = ({
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  setFieldValue,
}: FormikProps<IMenu>) => {
  return (
    <Flex flex={1} px="25px" justify="space-around" align="center">
      <Flex align="center" w="100%" h="40%" justify="space-around">
        <FormControl>
          <FormControl.Label>Nome</FormControl.Label>
          <Input
            value={values.name}
            onChangeText={handleChange('name')}
            placeholder="Nome da categoria"
          />
          <ErrorMessage name="name" component={FormControl.ErrorMessage} />
        </FormControl>

        <FormControl>
          <FormControl.Label>Prioridade</FormControl.Label>
          <Input
            keyboardType="number-pad"
            value={values.priority.toString()}
            onChangeText={handleChange('priority')}
            placeholder="Prioridade"
          />
          <ErrorMessage name="priority" component={FormControl.ErrorMessage} />
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
