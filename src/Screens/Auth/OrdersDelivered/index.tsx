import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, Alert, TouchableOpacity } from 'react-native';

import { ModalBaseHandle } from '../../../Components/ModalBase/props';
import { getApi } from '../../../services/api';
import { ListEmpty } from './Components';
import { CardOrder, ModalOrder } from '../../../Components';

import { Container } from './styles';

export const OrdersDelivered = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [finish, setFinish] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const modalRef = useRef<ModalBaseHandle>(null);

  const getOrders = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/list-orders-types', { params: { type: 'Finalizado' } });

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

      const { data } = await api.get('/list-orders-types', { params: { page: newPage, type: 'Finalizado' } });

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

  const onPressItem = useCallback((id: number) => {
    setSelectedId(id)
    modalRef.current?.open();
  }, []);

  return (
    <Container>
      <ModalOrder reender={getOrders} modalRef={modalRef} id={selectedId} />
      <FlatList
        style={{ paddingTop: 15 }}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={orders}
        onEndReached={loadMore}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressItem(item.id)}>
            <CardOrder {...item} />
          </TouchableOpacity>
        )}
      />
    </Container>
  )
}

