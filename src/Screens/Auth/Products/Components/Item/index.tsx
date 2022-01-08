import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import formatPrice from '../../../../../utils/format-number';
import { CardBase } from '../../../../../Components/_Bases';

import api from '@services/api';
import { ItemProps } from './props';
import { Container, Text, Photo, Info } from './styles';

export const Item = ({ id, name, price, photo, menu_id, reender }: ItemProps) => {
  const navigation = useNavigation<any>();

  const edit = () => navigation.navigate('ProductUpdate', { id });

  const deleteProduct = async () => {
    try {
      await api.delete(`/products/${menu_id}/${id}`);
      reender();
    } catch (err) {
      Alert.alert('Erro', 'Erro ao deletar produto');
    }
  };

  const del = () => {
    Alert.alert('Apagar', `Você tem certeza que deseja apagar o produto ${name}?`, [
      {
        text: 'Apagar',
        onPress: deleteProduct,
      },
      {
        text: 'Sair',
      },
    ]);
  };

  return (
    <CardBase
      onPress={edit}
      onLongPress={del}
      style={{ width: '80%', alignSelf: 'center' }}
    >
      <Container>
        <Photo source={{ uri: photo }} />
        <Info>
          <Text>{name.length > 25 ? name.substring(0, 22) + '...' : name}</Text>
          <Text>{formatPrice(price)}</Text>
        </Info>
      </Container>
    </CardBase>
  );
};
