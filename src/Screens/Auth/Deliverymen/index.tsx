import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import { getApi } from '../../../services/api';
import { Item, ListEmpty } from './Components';

import { Container } from './styles';
import { Deliveryman } from './props';

export const Deliverymen = () => {
  const api = getApi();

  const [deliverymen, setDeliverymen] = useState<Deliveryman[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [finish, setFinish] = useState(false);

  const getDeliverymen = useCallback(async () => {
    try {
      const { data } = await api.get('/deliverymen');

      setDeliverymen(data.result);
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os motoboy');
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getDeliverymen()
  }, [getDeliverymen])

  const loadMore = async () => {
    if(!finish) {
      const newPage = page + 1;
      setPage(newPage);

      const { data } = await api.get('/deliverymen', { params: { page: newPage } });

      if(data.result.length === 0) {
        setFinish(true);
      } else {
        setDeliverymen(old => [...old, ...data.result]);
      }
    }
  }

  const onRefresh = async () => {
    setPage(0);
    await getDeliverymen();
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
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Item {...item} />}
      />
    </Container>
  )
}

