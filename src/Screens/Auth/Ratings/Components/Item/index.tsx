import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import formatPrice from '../../../../../utils/format-number';
import { CardBase } from '../../../../../Components/_Bases';

import { getApi } from '../../../../../services/api';
import { ItemProps } from './props';
import { Container, Text, Content, Photo, Info } from './styles';

export const Item = ({ id, name, price, photo, menu_id }: ItemProps) => {
  const navigation = useNavigation();

  const view = () => {};

  return (
    <CardBase onPress={view}>
      <Container>
        <Content>
          <Info>
            <Text>{name}</Text>
            <Text>{formatPrice(price)}</Text>
          </Info>
        </Content>
      </Container>
    </CardBase>
  )
}
