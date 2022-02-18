import { useEffect, useState, useRef } from 'react';
import { FlatList, Alert } from 'react-native';
import { Flex } from 'native-base';

import { ModalBaseHandle } from '../../../Components/ModalBase/props';
import { CardOrder, ModalOrder } from '../../../Components';
import api from '@services/api';
import { ListEmpty } from './Components';

import type { IOrder } from './props';

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const modalRef = useRef<ModalBaseHandle>(null);

  useEffect(() => {
    api
      .get('/orders', {
        params: {
          types: JSON.stringify(['Novo', 'Aceito', 'Em preparo', 'Saiu para entrega']),
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
  }, [page, loading]);

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
    <>
      <ModalOrder reender={onRefresh} modalRef={modalRef} id={selectedId} />
      <Flex flex={1} justify="center" align="center">
        <FlatList
          style={{ paddingTop: 15 }}
          ListEmptyComponent={ListEmpty}
          refreshing={loading}
          onRefresh={onRefresh}
          data={orders}
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => <CardOrder onPress={onPressItem} {...item} />}
        />
      </Flex>
    </>
  );
};
