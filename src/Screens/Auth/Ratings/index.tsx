import { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import api from '@services/api';
import { Item, ListEmpty } from './Components';

import { Container } from './styles';

export const Ratings = () => {
  const [ratings, setRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const getRating = useCallback(async (newPage = 0) => {
    try {
      const { data } = await api.get('/list-rates', {
        params: { page: newPage },
      });

      setRatings((old) => old.concat(data.result));
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar as avaliações');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRating(page);
  }, [getRating, page]);

  const loadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const onRefresh = () => {
    setLoading(true);
    setPage(0);
  };

  return (
    <Container>
      <FlatList
        style={{ paddingTop: 15 }}
        ListHeaderComponentStyle={{ alignSelf: 'center', paddingBottom: 15 }}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={ratings}
        onEndReachedThreshold={0}
        onEndReached={loadMore}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Item {...item.evaluation} />}
      />
    </Container>
  );
};
