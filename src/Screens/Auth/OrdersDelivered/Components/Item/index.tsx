import React from 'react';
import { useNavigation } from '@react-navigation/native';

import formatPrice from '../../../../../utils/format-number';
import { CardBase } from '../../../../../Components/_Bases';

import { ItemProps } from './props';
import { Container, Text, Content, Info } from './styles';

export const Item = ({ id }: ItemProps) => {
  const navigation = useNavigation();

  const see = () => {};

  return (
    <CardBase onPress={see}>
      <Container>
        <Content>
          <Info>
           {/*  <Text>{name}</Text>
            <Text>{formatPrice(price)}</Text> */}
          </Info>
        </Content>
      </Container>
    </CardBase>
  )
}
