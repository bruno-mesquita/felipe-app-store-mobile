import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { getApi } from '../../../../../services/api';
import { Menus } from '../Tabs/props';
import { Container, Tabs, Text } from './styles';

export const Tab = () => {
  const [menus, setMenus] = useState<Menus[]>([]);
  // const [products, setProducts] = useState<[]>([]);

  const getMenu = async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/menus');

      setMenus(data.result);
    }catch(err) {
      Alert.alert('Erro', 'Erro ao buscar os Menus');
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  // Parei neste código de baixo

  // const getProduts = async () => {
  //   try {
  //     const api = getApi();

  //     const { data } = await api.get('/products');

  //     setProducts(data.result);
  //   }catch(err) {
  //     Alert.alert('Erro', 'Erro ao buscar os Produtos');
  //   }
  // };

  // useEffect(() => {
  //   getProduts();
  // }, []);

  return (
    <Container>
      {
        menus.map(
          index => (
            <Tabs>
              <Text>{index.name}</Text>
            </Tabs>
          )
        )
      }
    </Container>
  );
};
