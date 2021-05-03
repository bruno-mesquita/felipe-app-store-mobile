import React, { useState } from 'react';
import { Alert } from 'react-native';

import { FieldMask } from '../../../Components/FormUtils';
import { Button } from '../../../Components';

import { Container } from './styles';
import { getApi } from '../../../services/api';

export const SalesReport = () => {
  const [init, setInit] = useState('');
  const [end, setEnd] = useState('');

  const onSubmit = async () => {
    try {
      const api = getApi();

      Alert.alert('Gerado!', 'O relatório')
    } catch (err) {
      Alert.alert('Erro', 'Parece que houve um erro ao gerar o seu relatório, por favor tente novamente')
    }
  }

  return (
    <Container>
      <FieldMask
        value={init}
        type="datetime"
        options={{ format: 'DD/MM/YYYY' }}
        placeholder="DD/MM/AAAA"
        label="Data de inicio"
        labelColor="#000"
        onChangeText={setInit}
      />

      <FieldMask
        value={end}
        type="datetime"
        options={{ format: 'DD/MM/YYYY' }}
        placeholder="DD/MM/AAAA"
        label="Data final"
        labelColor="#000"
        onChangeText={setEnd}
      />

      <Button onPress={onSubmit}>Gerar</Button>
    </Container>
  )
}
