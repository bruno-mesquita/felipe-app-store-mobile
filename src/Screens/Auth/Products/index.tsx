import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import api from '../../../services/api';
import { Item, AddButton, ListEmpty } from './Components';

import { Container } from './styles';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* const getMenus = useCallback(async () => {
    try {
      const { data } = await api.get('/menus/${}');

      setMenus(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro ao buscar os seus cardapios');
    }
  }, [])

  useEffect(() => {
    getMenus()
  }, [getMenus]) */

  return (
    <Container>
      <FlatList
        ListEmptyComponent={ListEmpty}
        /* refreshing={loading}
        onRefresh={getMenus} */
        data={products}
        renderItem={({ item }) => <Item item={item} />}
      />
      <AddButton />
    </Container>
  )
}

