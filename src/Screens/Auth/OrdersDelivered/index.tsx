import { useEffect, useState, useRef } from 'react';
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

  useEffect(() => {
    api
      .get('/orders', {
        params: {
          types: JSON.stringify(['Entregue']),
          page,
        },
      })
      .then(({ data }) => {
        if (page === 0) setOrders(data.result);
        else setOrders((old) => old.concat(data.result));
      })
      .catch((err) => {
        const { message } = err.response.data;

        Alert.alert('Houve um erro!', message);
      })
      .finally(() => setLoading(false));
  }, [page]);

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

  return (
    <Container>
      <ModalOrder reender={onRefresh} modalRef={modalRef} id={selectedId} />
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
