import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import api from '../../../services/api';
import { Item, AddButton, ListEmpty } from './Components';

import { Container } from './styles';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/products');

      setProducts(data.result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro ao buscar os seus cardapios');
    }
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <Container>
      <FlatList
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={getProducts}
        data={products}
        renderItem={({ item }) => <Item item={item} />}
      />
      <AddButton />
    </Container>
  )
}

