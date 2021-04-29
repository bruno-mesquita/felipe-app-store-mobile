import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import api from '../../../services/api';
import { Item, AddButton, ListEmpty } from './Components';

import { Container } from './styles';
import { Product } from './props';

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [finish, setFinish] = useState(false);

  const getProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/products', { params: { page } });

      if(data.result.length === 0) {
        setFinish(true);
      } else {
        setProducts(old => [...old, ...data.result]);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro ao buscar os seus cardapios');
    }
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const loadMore = async () => {
    if(!finish) {
      setPage(page + 1);

      await getProducts();
    }
  }

  const onRefresh = async () => {
    setPage(0);
    await getProducts();
  }

  return (
    <Container>
      <FlatList
        style={{ paddingTop: 15 }}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={products}
        onEndReached={loadMore}
        renderItem={({ item }) => <Item {...item} photo={item.photo.encoded} />}
      />
      <AddButton />
    </Container>
  )
}

