import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getApi } from '../../../services/api';
import { Item, AddButton, ListEmpty, FieldSearch  } from './Components';

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
      const api = getApi();

      const { data } = await api.get('/menus');

      setMenus(data.result);
    } catch(err) {
      Alert.alert('Erro', 'Erro ao buscar os Menus');
    }
  }, []);

  const getProducts = useCallback(async (newPage = 0, menuId = null, reset = false) => {
    try {
      const api = getApi();

      const { data } = await api.get('/products', { params: { page: reset ? 0 : newPage, menuId } });

      if(menuId && newPage === 0) setProducts(data.result);
      else {
        if(reset) {
          setPage(0);
          setProducts(old => newPage === 0 ? data.result : old.concat(data.result));
        }
        else setProducts(data.result);
      }

    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os produtos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  useFocusEffect(useCallback(() => {
    getProducts(page, menuSelected);
  }, [getProducts, page, menuSelected]));

  const loadMore = () => {
    setLoading(true);
    setPage(page + 1);
  }

  const onRefresh = () => {
    setLoading(true);
    setPage(0);
  }

  const setMenu = (id: number) => {
    setMenuSelected(id);
    setPage(0);
  }

  const Header = () => (
    <>
      <FieldSearch refreshing={loading} response={setProducts} />
      <TabContainer>
        {
          menus.map((menu, index) => {
            const selected = menuSelected === menu.id;

            return (
              <Tab first={index === 0} selected={selected} onPress={() => setMenu(menu.id)}>
                <TabText selected={selected}>{menu.name}</TabText>
              </Tab>
            )}
          )
        }
      </TabContainer>
    </>
  );

  const reender = async () => getProducts(page, menuSelected, true);

  return (
    <Container>
      <FlatList
        ListHeaderComponent={Header}
        ListEmptyComponent={ListEmpty}
        refreshing={loading}
        onRefresh={onRefresh}
        data={products}
        onEndReached={loadMore}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item {...item} reender={reender} photo={item.photo.encoded} />}
      />
      <AddButton />
    </Container>
  );
}
