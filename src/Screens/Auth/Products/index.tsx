import { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { Fab, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import api from '@services/api';
import useGetMenus from '@hooks-api/useGetMenus';

import { Item, ListEmpty, FieldSearch } from './Components';
import { Container, Tab, TabContainer, TabText } from './styles';
import type { IProduct } from './props';

export const Products = ({ navigation }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [menuSelected, setMenuSelected] = useState<number | null>(null);

  const { data: menus } = useGetMenus();

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
  }, [page, menuSelected]);

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

  const onPress = () => navigation.navigate('ProductRegistration');

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
      <Fab
        bg="#770202"
        onPress={onPress}
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={Ionicons} name="add" size="sm" />}
      />
    </Container>
  );
};
