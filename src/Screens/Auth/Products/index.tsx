import { useState, useCallback, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '@services/api';
import { Item, AddButton, ListEmpty, FieldSearch } from './Components';

import { Container, Tab, TabContainer, TabText } from './styles';
import { Product } from './props';

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [menus, setMenus] = useState<any[]>([]);
  const [menuSelected, setMenuSelected] = useState(null);

  const getMenus = useCallback(async () => {
    try {
      const { data } = await api.get('/menus');

      setMenus(data.result);
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os Menus');
    }
  }, []);

  const getProducts = useCallback(
    async (newPage = 0, menuId = null, reset = false) => {
      try {
        const { data } = await api.get('/products', {
          params: { page: reset ? 0 : newPage, menuId },
        });

        if (menuId && newPage === 0) setProducts(data.result);
        else {
          if (reset || newPage === 0) {
            setPage(0);
            setProducts(data.result);
          } else setProducts((old) => old.concat(data.result));
        }
      } catch (err) {
        Alert.alert('Erro', 'Erro ao buscar os produtos');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  useFocusEffect(
    useCallback(() => {
      getProducts(page, menuSelected);
    }, [getProducts, page, menuSelected])
  );

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

  const reender = async () => getProducts(page, menuSelected, true);

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
          <Item {...item} reender={reender} photo={item.photo.encoded} />
        )}
      />
      <AddButton />
    </Container>
  );
};
