import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import formatPrice from '../../../../../utils/format-number';
import { CardBase } from '../../../../../Components/_Bases';

import api from '../../../../../services/api';
import { ItemProps } from './props';
import { Container, Text, Content, Photo, Info } from './styles';

export const Item = ({ id, name, price, photo }: ItemProps) => {
  const navigation = useNavigation();

  const edit = () => navigation.navigate('ProductUpdate', { id });

  const deleteProduct = async () => {
    try {
      await api.delete(`/products/${id}`);
    } catch (err) {

    }
  }

  const del = () => {
    Alert.alert('Apagar', `Você tem certeza que deseja apagar o produto ${name}?`, [
      {
        text: 'Apagar',
        onPress: deleteProduct
      },
      {
        text: 'Sair',
      }
    ])
  }

  return (
    <CardBase onPress={edit} onLongPress={del}>
      <Container>
        <Content>
          <Photo source={{ uri: photo }} />
          <Info>
            <Text>{name}</Text>
            <Text>{formatPrice(price)}</Text>
          </Info>
        </Content>
      </Container>
    </CardBase>
  )
}
