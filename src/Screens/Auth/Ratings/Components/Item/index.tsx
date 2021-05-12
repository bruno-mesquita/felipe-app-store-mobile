import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Rating } from 'react-native-ratings';

import { CardBase } from '../../../../../Components/_Bases';
import { ItemProps } from './props';
import { Container, Text } from './styles';

export const Item = ({ message, value }: ItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <CardBase component="view" style={{ width: width * 0.8 }}>
      <Container>
        <Text style={{ paddingBottom: 10 }}>{message}</Text>
        <Rating imageSize={25} readonly startingValue={value} />
      </Container>
    </CardBase>
  )
}
