import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { ItemProps } from './props';
import { Container, Text } from './styles';
import api from '@services/api';

export const Item = ({ item, reender }: ItemProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const edit = () => navigation.navigate('UpdateMenu', { id: item.id });

  const deleteMenu = async () => {
    try {
      await api.delete(`/menus/${item.id}`);
      await reender();
    } catch (err) {
      Alert.alert('Erro', 'Erro ao deletar menu');
    }
  }

  const del = () => {
    Alert.alert('Apagar', `Você tem certeza que deseja apagar o cardápio ${item.name}? todos os produtos desse cardápio também vão ser apagados`, [
      {
        text: 'Apagar',
        onPress: deleteMenu
      },
      {
        text: 'Sair',
      }
    ])
  }

  return (
    <Container onPress={edit} onLongPress={del}>
      <Text>{item.name}</Text>
      <Ionicons name="chevron-forward" size={25} color={colors.primary} />
    </Container>
  )
}
