import { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, Alert } from 'react-native';

import { ModalBaseHandle } from '../../../Components/ModalBase/props';
import { CardOrder, ModalOrder } from '../../../Components';
import api from '@services/api';
import { ListEmpty } from './Components';

import { Container } from './styles';
import { Order } from './props';

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const modalRef = useRef<ModalBaseHandle>(null);

  const getOrders = useCallback(async (newPage = 0, loop = false, reset = false) => {
    try {
      const { data } = await api.get('/list-orders-types', { params: { type: 'Aberto', page: reset ? 0 : newPage } });

      if(reset || loop) {
        setOrders(data.result);
        setPage(0);
      } else setOrders(old => newPage === 0 ? data.result : old.concat(data.result));

    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os pedidos');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getOrders()

    const funcInterval = setInterval(async () => getOrders(page, true), 8000);

    return () => clearInterval(funcInterval);
  }, [getOrders])

  const loadMore = () => {
    setLoading(true);
    setPage(page + 1);
  }

  const onRefresh = () => {
    setLoading(true);
    setPage(0);
  }

  const onPressItem = (id: number) => {
    setSelectedId(id)
    modalRef.current?.open();
  };

  const reender = async () => getOrders(0, false, true);

  return (
    <>
      <ModalOrder reender={reender} modalRef={modalRef} id={selectedId} />
      <Container>
        <FlatList
          style={{ paddingTop: 15 }}
          ListEmptyComponent={ListEmpty}
          refreshing={loading}
          onRefresh={onRefresh}
          data={orders}
          onEndReachedThreshold={0}
          onEndReached={loadMore}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <CardOrder onPress={onPressItem} {...item} />}
        />
      </Container>
    </>
  )
}

