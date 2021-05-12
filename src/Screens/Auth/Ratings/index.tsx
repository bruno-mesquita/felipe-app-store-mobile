import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import { getApi } from '../../../services/api';
import { Item, ListEmpty } from './Components';

import { Container } from './styles';

export const Ratings = () => {
  const [ratings, setRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [finish, setFinish] = useState(false);

  const getRating = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/list-rates');

      setRatings(data.result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert('Erro', 'Erro ao buscar as avaliações');
    }
  }, [])

  useEffect(() => {
    getRating()
  }, [getRating])

  const loadMore = async () => {
    if(!finish) {
      const newPage = page + 1;
      setPage(newPage);

      const api = getApi();

      const { data } = await api.get('/ratings', { params: { page: newPage } });

      if(data.result.length === 0) {
        setFinish(true);
      } else {
        setRatings(old => [...old, ...data.result]);
      }
    }
  }

  const onRefresh = async () => {
    setPage(0);
    await getRating();
  }

  return (
    <Container>
      <FlatList
        style={{ paddingTop: 15 }}
        ListHeaderComponentStyle={{ alignSelf: 'center', paddingBottom: 15 }}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={ratings}
        onEndReached={loadMore}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Item {...item.evaluation} />}
      />
    </Container>
  )
}

