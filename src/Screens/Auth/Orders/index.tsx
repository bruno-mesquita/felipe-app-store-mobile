import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, Alert, TouchableOpacity } from 'react-native';

import { ModalBaseHandle } from '../../../Components/ModalBase/props';
import { CardOrder, ModalOrder } from '../../../Components';
import { getApi } from '../../../services/api';
import { ListEmpty } from './Components';

import { Container } from './styles';
import { Order } from './props';

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [finish, setFinish] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const modalRef = useRef<ModalBaseHandle>(null);

  const getOrders = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/list-orders-types', { params: { type: 'Aberto' } });

      setOrders(data.result);
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os pedidos');
    } finally {
      setLoading(false);
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

      const { data } = await api.get('/list-orders-types', { params: { page: newPage, type: 'Em andamento' } });

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
    <>
      <ModalOrder reender={getOrders} modalRef={modalRef} id={selectedId} />
      <Container>
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
    </>
  )
}

