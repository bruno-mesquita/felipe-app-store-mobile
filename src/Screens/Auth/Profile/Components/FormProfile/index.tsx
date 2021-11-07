import { useRef, useState } from 'react';
import { Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInputMasked } from 'react-native-masked-text';

import { useUser, useTakePhoto } from '../../../../../hooks';
import { usePermissionGallery } from '../../../../../hooks/permissions';
import { Field, FieldMask, FieldError } from '../../../../../Components/FormUtils';
import { Button } from '../../../../../Components';
import { getApi } from '../../../../../services/api';

import { Container, Form, UserAvatar } from './styles';
import { Values } from './props';
import schema from './schema';

export const FormProfile = () => {
  const takePhoto = useTakePhoto();
  const permission = usePermissionGallery();
  const user = useUser(['name', 'email', 'cellphone', 'freightValue', 'openingTime', 'closingTime', 'image']);
  const inputPhoneRef = useRef<TextInputMasked>(null);

  const [img, setImg] = useState('');

  const onSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    try {
      const api = getApi();

      const body = {
        name: values.name,
        email: values.email,
        freightValue: Number(values.freightValue),
        openingTime: Number(values.openingTime),
        closingTime: Number(values.closingTime),
        cellphone: inputPhoneRef.current?.getRawValue(),
      }

      await api.put('/establisments', body);
      setSubmitting(false);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso :)')
    } catch (err) {
      setSubmitting(false);
      Alert.alert('Erro', 'Parece que houve um erro ao atualizar os seus dados :(')
    }
  }

  const pickImage = async () => {
    try {
      const encoded = await takePhoto();

      if(encoded) {
        const api = getApi();

        await api.put('/image', { encoded });

        setImg(encoded);
        Alert.alert('Sucesso', 'Dados atualizados com sucesso :)')
      };
    } catch (err) {
      Alert.alert('Erro', 'Parece que houve um erro ao atualizar a sua foto :(')
    }
  }

  return (
    <ScrollView>
      <Container>
        <Formik
          initialValues={user}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={schema}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <Form>
              <TouchableOpacity style={{ alignSelf: 'center', marginTop: -30, paddingBottom: 20 }} disabled={!permission} onPress={pickImage}>
                {user?.image || img !== '' ? (
                  <UserAvatar source={{ uri: user?.image || img }} />
                ) : (
                  <MaterialIcons
                    name="account-circle"
                    size={100}
                    color="#c4c4c4"
                  />
                )}
              </TouchableOpacity>

              <Field
                labelColor="#000"
                label="Nome do estabelecimento"
                onChangeText={handleChange('name')}
                value={values.name}
              />
              <FieldError name="name" />

              <Field
                labelColor="#000"
                label="Email"
                onChangeText={handleChange('email')}
                value={values.email}
              />
              <FieldError name="email" />

              <FieldMask
                maskRef={inputPhoneRef}
                labelColor="#000"
                type="cel-phone"
                label="Telefone"
                options={{ withDDD: true }}
                onChangeText={handleChange('cellphone')}
                value={values.cellphone}
              />
              <FieldError name="cellphone" />

              <Field
                labelColor="#000"
                label="Preço do Frete"
                onChangeText={handleChange('freightValue')}
                value={String(values.freightValue)}
              />
              <FieldError name="freightValue" />

              <Field
                labelColor="#000"
                label="Horário de abertura"
                onChangeText={handleChange('openingTime')}
                value={String(values.openingTime)}
              />
              <FieldError name="openingTime" />

              <Field
                labelColor="#000"
                label="Horário de fechamento"
                onChangeText={handleChange('closingTime')}
                value={String(values.closingTime)}
              />
              <FieldError name="closingTime" />

              <Button style={{ marginTop: 20 }} loading={isSubmitting} disabled={isSubmitting} onPress={() => handleSubmit()}>Atualizar</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ScrollView>
  )
}
