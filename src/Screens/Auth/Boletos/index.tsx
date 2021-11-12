import { useState, useEffect, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import api from '@services/api';

import { Card, ListEmpty } from './Components';
import { Boleto } from './props';
import { Container } from './styles';

export const Boletos = () => {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const getTickets = useCallback(async (newPage = 0) => {
    try {
      const { data } = await api.get('/tickets', {
        params: { page: newPage }
      });

      setBoletos(old => old.concat(data.result));
    } catch (err) {
      console.log(err.response);
      Alert.alert('Erro', 'Erro ao buscar os boletos ');
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getTickets(page)
  }, [getTickets, page])

  const loadMore = async () => {
    setLoading(true);
    setPage(page + 1);
  }

  const onRefresh = () => {
    setLoading(true);
    setPage(0);
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
        onEndReachedThreshold={0}
        onEndReached={loadMore}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Card {...item} />}
      />
    </Container>
  )
}
