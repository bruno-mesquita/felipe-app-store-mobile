import React, { useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getApi } from '../../../services/api';
import { Item, AddButton, ListEmpty, FieldSearch } from './Components';

import { Container } from './styles';
import { Product } from './props';

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const getProducts = useCallback(async (newPage = 0) => {
    try {
      const api = getApi();

      const { data } = await api.get('/products', {
        params: { page: newPage }
      });

      setProducts(old => old.concat(data.result));
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os produtos');
    } finally {
      setLoading(false);
    }
  }, [])

  useFocusEffect(useCallback(() => {
    getProducts(page)
  }, [getProducts, page]))

  const loadMore = () => {
    setLoading(true);
    setPage(page + 1);
  }

  const onRefresh = () => {
    setLoading(true);
    setPage(0);
  }

  const Header = () => <FieldSearch refreshing={loading} response={setProducts} />

  return (
    <Container>
      <FlatList
        style={{ paddingTop: 15 }}
        ListHeaderComponentStyle={{ alignSelf: 'center', paddingBottom: 15 }}
        ListHeaderComponent={Header}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={products}
        onEndReached={loadMore}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Item {...item} reender={getProducts} photo={item.photo.encoded} />}
      />
      <AddButton />
    </Container>
  )
}

