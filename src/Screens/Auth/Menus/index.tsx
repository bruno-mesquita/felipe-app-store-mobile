import { useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '@services/api';
import { Item, AddMenuButton, ListEmpty } from './Components';

import { Container, Divider } from './styles';
import { Menu } from './props';

export const Menus = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  const getMenus = useCallback(async (newPage = 0) => {
    try {
      const { data } = await api.get('/menus');

      setMenus(data.result);
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os seus cardapios');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getMenus();
    }, [getMenus])
  );

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
  );
};
