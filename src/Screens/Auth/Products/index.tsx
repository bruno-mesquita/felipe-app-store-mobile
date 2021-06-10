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
  const [finish, setFinish] = useState(false);

  const getProducts = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/products');

      setProducts(data.result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro', 'Erro ao buscar os produtos');
    }
  }, [])

  useFocusEffect(useCallback(() => {
    getProducts()
  }, [getProducts]))

  const loadMore = async () => {
    if(!finish) {
      const newPage = page + 1;
      setPage(newPage);

      const api = getApi();

      const { data } = await api.get('/products', { params: { page: newPage } });

      if(data.result.length === 0) {
        setFinish(true);
      } else {
        setProducts(old => [...old, ...data.result]);
      }
    }
  }

  const onRefresh = async () => {
    setPage(0);
    await getProducts();
  }

  const response = (data) => {
    setProducts(data)
    setPage(0);
    setFinish(false);
  }

  const Header = () => <FieldSearch refreshing={loading} response={response} />

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

