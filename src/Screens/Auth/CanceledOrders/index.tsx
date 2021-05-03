import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import { getApi } from '../../../services/api';
import { Item, ListEmpty } from './Components';

import { Container } from './styles';
import { Order } from './props';

export const CanceledOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [finish, setFinish] = useState(false);

  const getOrders = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/orders', { params: { type: 'Cancelado' } });

      setOrders(data.result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro', 'Erro ao buscar os pedidos');
    }
  }, [])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  const loadMore = async () => {
    if(!finish) {
      const newPage = page + 1;
      setPage(newPage);

      const api = getApi();

      const { data } = await api.get('/orders', { params: { page: newPage, type: 'Cancelado' } });

      if(data.result.length === 0) {
        setFinish(true);
      } else {
        setOrders(old => [...old, ...data.result]);
      }
    }
  }

  const onRefresh = async () => {
    setPage(0);
    await getOrders();
  }

  return (
    <Container>
      <FlatList
        style={{ paddingTop: 15 }}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={orders}
        onEndReached={loadMore}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Item {...item} />}
      />
    </Container>
  )
}

