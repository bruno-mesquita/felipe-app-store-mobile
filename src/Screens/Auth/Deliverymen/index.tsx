import { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import api from '@services/api';
import { Item, ListEmpty } from './Components';

import { Container } from './styles';
import { Deliveryman } from './props';

export const Deliverymen = () => {
  const [deliverymen, setDeliverymen] = useState<Deliveryman[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const getDeliverymen = useCallback(async (newPage = 0) => {
    try {
      const { data } = await api.get('/deliverymen', {
        params: {
          page: newPage,
        }
      });

      setDeliverymen(old => old.concat(data.result));
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os motoboy');
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getDeliverymen(page)
  }, [getDeliverymen, page])

  const loadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const onRefresh = () => {
    setLoading(true);
    setPage(0);
  }

  return (
    <Container>
      <FlatList
        style={{ paddingTop: 15, width: '100%' }}
        ListHeaderComponentStyle={{ alignSelf: 'center', paddingBottom: 15 }}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={deliverymen}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Item {...item} />}
      />
    </Container>
  )
}

