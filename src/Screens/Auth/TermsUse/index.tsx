import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';

import { getApi } from '../../../services/api';

import { Container } from './styles';

export const TermsUse = () => {
  const [terms, setTerms] = useState('');

  useEffect(() => {
    const api = getApi();

    api.get('/terms-of-use')
      .then(({ data }) => setTerms(data.result.description))
      .catch(err => Alert.alert('Erro', 'erro ao buscar o termo de uso'))
  }, []);

  return (
    <Container>
      <Text>{terms}</Text>
    </Container>
  );
}
