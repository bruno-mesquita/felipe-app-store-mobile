import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import api from '../../../services/api';
import { Item, AddMenuButton, ListEmpty } from './Components';

import { Container, Divider } from './styles';

export const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMenus = useCallback(async () => {
    try {
      const { data } = await api.get('/menus');

      setMenus(data.result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro ao buscar os seus cardapios');
    }
  }, [])

  useEffect(() => {
    getMenus()
  }, [getMenus])

  return (
    <Container>
      <FlatList
        style={{ width: '100%', paddingTop: 10 }}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={getMenus}
        data={menus}
        renderItem={({ item }) => <Item item={item} />}
        ItemSeparatorComponent={Divider}
      />
      <AddMenuButton />
    </Container>
  )
}

