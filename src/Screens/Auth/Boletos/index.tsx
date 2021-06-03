import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import { getApi } from '../../../services/api';

import { Card, ListEmpty } from './Components';
import { Boleto } from './props';
import { Container } from './styles';

export const Boletos = () => {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [finish, setFinish] = useState(false);

  const getTickets = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/tickets');

      setBoletos(data.result);
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os boletos ');
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getTickets()
  }, [getTickets])

  const loadMore = async () => {
    if(!finish) {
      const newPage = page + 1;
      setPage(newPage);

      const api = getApi();

      const { data } = await api.get('/tickets', { params: { page: newPage } });

      if(data.result.length === 0) {
        setFinish(true);
      } else {
        setBoletos(old => [...old, ...data.result]);
      }
    }
  }

  const onRefresh = async () => {
    setPage(0);
    await getTickets();
  }

  return (
    <Container>
      <FlatList
        style={{ paddingTop: 15, width: '100%' }}
        ListEmptyComponent={ListEmpty}
        ListHeaderComponentStyle={{ alignSelf: 'center', paddingBottom: 15 }}
        refreshing={loading}
        onRefresh={onRefresh}
        data={boletos}
        onEndReached={loadMore}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Card {...item} />}
      />
    </Container>
  )
}
