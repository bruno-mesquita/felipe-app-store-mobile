import React, { useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getApi } from '../../../services/api';
import { Item, AddButton, ListEmpty, FieldSearch, Tab } from './Components';

import { Container } from './styles';
import { Product } from './props';

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [menuSelected, setMenuSelected] = useState(null);

  const getProducts = async (newPage = 0, menu = null) => {
    try {
      const api = getApi();

      const { data } = await api.get('/products', { params: { page: newPage, menu } });

      setProducts(old => old.concat(data.result));
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os produtos');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    getProducts(page, menuSelected);
  }, [getProducts, page, menuSelected]));

  const loadMore = () => setPage(page + 1);

  const onRefresh = () => setPage(0);

  const Header = () => (
    <>
      <FieldSearch refreshing={loading} response={setProducts} />
      <Tab setMenuSelected={setMenuSelected} />
    </>
  );

  return (
    <Container>
      <FlatList
        style={{  margin: 20 }}
        ListHeaderComponent={Header}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={products}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item {...item} reender={getProducts} photo={item.photo.encoded} />}
      />
      <AddButton />
    </Container>
  );
}
