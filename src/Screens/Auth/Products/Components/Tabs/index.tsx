import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { getApi } from '../../../../../services/api';
import { Menu } from '../Tabs/props';
import { Container, Tabs, Text } from './styles';

export const Tab = ({ setMenuSelected }) => {
  const [menus, setMenus] = useState<Menu[]>([]);

  const getMenu = async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/menus');

      setMenus(data.result);
    } catch(err) {
      Alert.alert('Erro', 'Erro ao buscar os Menus');
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <Container>
      {
        menus.map(
          menu => (
            <Tabs onPress={() => setMenuSelected(menu.id)}>
              <Text>{menu.name}</Text>
            </Tabs>
          )
        )
      }
    </Container>
  );
};
