import { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, Alert } from 'react-native';

import { ModalBaseHandle } from '../../../Components/ModalBase/props';
import api from '@services/api';
import { ListEmpty } from './Components';
import { CardOrder, ModalOrder } from '../../../Components';

import { Container } from './styles';

export const CanceledOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const modalRef = useRef<ModalBaseHandle>(null);

  const getOrders = useCallback(async (newPage = 0) => {
    try {
      const { data } = await api.get('/list-orders-types', { params: { type: 'Cancelado', page: newPage } });

      setOrders(old => newPage === 0 ? data.result : old.concat(data.result));
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os pedidos');
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getOrders(page)
  }, [getOrders, page])

  const loadMore = async () => {
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

  return (
    <Container>
      <ModalOrder reender={onRefresh} modalRef={modalRef} id={selectedId} />
      <FlatList
        style={{ paddingTop: 15 }}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={orders}
        onEndReached={loadMore}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CardOrder {...item} onPress={onPressItem} />}
      />
    </Container>
  )
}

