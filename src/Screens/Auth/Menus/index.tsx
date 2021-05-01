import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';

import { getApi } from '../../../services/api';
import { Item, AddMenuButton, ListEmpty } from './Components';

import { Container, Divider } from './styles';
import { Menu } from './props';

export const Menus = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  const getMenus = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/menus');

      setMenus(data.result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro', 'Erro ao buscar os seus cardapios');
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
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Item item={item} reender={getMenus} />}
        ItemSeparatorComponent={Divider}
      />
      <AddMenuButton />
    </Container>
  )
}

