import { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import api from '@services/api';
import { Item, AddButton, ListEmpty, FieldSearch } from './Components';

import { Container, Tab, TabContainer, TabText } from './styles';
import type { IProduct } from './props';

export const Products = () => {
  const isFocused = useIsFocused();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [menuSelected, setMenuSelected] = useState(null);

  useEffect(() => {
    api.get('/menus').then(({ data }) => setMenus(data.result));
  }, []);

  useEffect(() => {
    api
      .get('/products', {
        params: { page, menuId: menuSelected },
      })
      .then(({ data }) => {
        setProducts((old) => (page === 0 ? data.result : old.concat(data.result)));
      })
      .catch(() => Alert.alert('Erro', 'Erro ao buscar os produtos'))
      .finally(() => setLoading(false));
  }, [isFocused, page, menuSelected]);

  const loadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const onRefresh = () => {
    setLoading(true);
    setPage(0);
  };

  const setMenu = (id: number) => {
    setMenuSelected(id);
    setPage(0);
  };

  return (
    <Container>
      <FieldSearch refreshing={loading} response={setProducts} />
      <TabContainer>
        {menus.map((menu, index) => {
          const selected = menuSelected === menu.id;

          return (
            <Tab
              key={menu.id}
              first={index === 0}
              selected={selected}
              onPress={() => setMenu(menu.id)}
            >
              <TabText selected={selected}>{menu.name}</TabText>
            </Tab>
          );
        })}
      </TabContainer>
      <FlatList
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={products}
        onEndReached={loadMore}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item {...item} reender={onRefresh} photo={item.photo.encoded} />
        )}
      />
      <AddButton />
    </Container>
  );
};
