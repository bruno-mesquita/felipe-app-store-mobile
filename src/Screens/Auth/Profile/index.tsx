import { useRef } from 'react';
import { ErrorMessage, Formik } from 'formik';
import { TextInputMasked } from 'react-native-masked-text';
import { Flex, Button, useToast, FormControl, Input } from 'native-base';

import api from '@services/api';
import { useUser } from '../../../hooks';
import { FieldMask } from '../../../Components/FormUtils';

import { Values } from './props';
import schema from './schema';

export const Profile = () => {
  const toast = useToast();

  const user = useUser(['last_name', 'first_name', 'email', 'cellphone']);
  const inputPhoneRef = useRef<TextInputMasked>(null);

  const onSubmit = async (values: Values) => {
    try {
      await api.put('/owners', {
        ...values,
        cellphone: inputPhoneRef.current?.getRawValue(),
      });

      toast.show({
        title: 'Sucesso',
        description: 'Dados atualizados com sucesso :)',
      });
    } catch (err) {
      toast.show({
        title: 'Erro',
        description: 'Parece que houve um erro ao atualizar os seus dados :(',
      });
    }
  };

  return (
    <Flex flex={1} justify="space-around" px="25px">
      <Formik
        initialValues={user}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={schema}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <>
            <Flex>
              <FormControl>
                <FormControl.Label>Primeiro nome</FormControl.Label>
                <Input
                  onChangeText={handleChange('first_name')}
                  value={values.first_name}
                />
                <ErrorMessage name="first_name" component={FormControl.ErrorMessage} />
              </FormControl>

              <FormControl mt="10px">
                <FormControl.Label>Sobrenome</FormControl.Label>
                <Input
                  onChangeText={handleChange('last_name')}
                  value={values.last_name}
                />
                <ErrorMessage name="last_name" component={FormControl.ErrorMessage} />
              </FormControl>

              <FormControl mt="10px">
                <FormControl.Label>Email</FormControl.Label>
                <Input onChangeText={handleChange('email')} value={values.email} />
                <ErrorMessage name="email" component={FormControl.ErrorMessage} />
              </FormControl>

              <FormControl mt="10px">
                <FormControl.Label>Telefone</FormControl.Label>
                <FieldMask
                  maskRef={inputPhoneRef}
                  type="cel-phone"
                  options={{ withDDD: true }}
                  onChangeText={handleChange('cellphone')}
                  value={values.cellphone}
                />
                <ErrorMessage name="cellphone" component={FormControl.ErrorMessage} />
              </FormControl>
            </Flex>
            <Button
              mt="20px"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              onPress={() => handleSubmit()}
            >
              Atualizar
            </Button>
          </>
        )}
      </Formik>
    </Flex>
  );
};
