import { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, Alert } from 'react-native';

import api from '@services/api';
import { ModalBaseHandle } from '../../../Components/ModalBase/props';
import { ListEmpty } from './Components';
import { CardOrder, ModalOrder } from '../../../Components';

import { Container } from './styles';

export const OrdersDelivered = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const modalRef = useRef<ModalBaseHandle>(null);

  const getOrders = useCallback(async (newPage = 0, reset = false) => {
    try {
      const { data } = await api.get('/list-orders-types', {
        params: { type: 'Finalizado', page: reset ? 0 : newPage },
      });

      setOrders((old) =>
        reset || newPage === 0 ? data.result : old.concat(data.result)
      );
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os pedidos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders(page);
  }, [getOrders, page]);

  const loadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const onRefresh = () => {
    setLoading(true);
    setPage(0);
  };

  const onPressItem = (id: number) => {
    setSelectedId(id);
    modalRef.current?.open();
  };

  const reender = async () => getOrders(page, true);

  return (
    <Container>
      <ModalOrder reender={reender} modalRef={modalRef} id={selectedId} />
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
  );
};
