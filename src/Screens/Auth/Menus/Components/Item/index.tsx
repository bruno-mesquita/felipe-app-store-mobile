import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Pressable, useToast } from 'native-base';

import api from '@services/api';
import useGetMenus from '@hooks-api/useGetMenus';

import type { ItemProps } from './props';

export const Item = ({ id, name }: ItemProps) => {
  const navigation = useNavigation<any>();
  const { mutate } = useGetMenus();
  const toast = useToast();

  const edit = () => navigation.navigate('UpdateMenu', { id });

  const deleteMenu = async () => {
    try {
      await api.delete(`/menus/${id}`);

      await mutate((oldData) => oldData.filter((menu) => menu.id !== id));
    } catch (err) {
      toast.show({
        title: 'Erro!',
        description: err.response.data.message || 'Erro ao deletar menu',
      });
    }
  };

  const del = () => {
    Alert.alert(
      'Apagar',
      `Você tem certeza que deseja apagar o cardápio ${name}? todos os produtos desse cardápio também vão ser apagados`,
      [
        {
          text: 'Apagar',
          onPress: deleteMenu,
        },
        {
          text: 'Sair',
        },
      ]
    );
  };

  return (
    <Pressable
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      onPress={edit}
      onLongPress={del}
    >
      <Text>{name}</Text>
      <Ionicons name="chevron-forward" size={25} color="#9E0404" />
    </Pressable>
  );
};
