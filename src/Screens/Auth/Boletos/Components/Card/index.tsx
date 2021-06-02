import React from 'react';
import { View, Text, Alert, Linking } from 'react-native';
import { format, parseISO } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import Clipboard from 'expo-clipboard';

import formatNumber from '../../../../../utils/format-number';
import { CardBase } from '../../../../../Components';
import { CardProps } from './props';
import { Content } from './styles';

export const Card = ({ barcode, link, price, date_of_expiration }: CardProps) => {
  const { colors } = useTheme();

  const copy = () => Clipboard.setString(barcode);
  const download = async () => {
    const result = await Linking.canOpenURL(link);

    if(result) Linking.openURL(link);
  };

  const formattedDate = (date: string) => {
    return format(parseISO(date), "dd/MM/yyyy")
  }

  const onPress = () => {
    Alert.alert('Boleto - Flipp Delivery', '', [
      {
        text: 'Fechar',
      },
      {
        text: 'Baixar',
        onPress: download,
      },
      {
        text: 'Copiar codigo de barra',
        onPress: copy,
      },
    ]);
  };

  return (
    <CardBase onPress={onPress} style={{ width: '80%', alignSelf: 'center' }}>
      <Content>
        <View style={{ justifyContent: 'center' }}>
          <MaterialCommunityIcons name="check-circle" size={30} color={colors.third} />
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Text>Vecimento: {formattedDate(date_of_expiration)}</Text>
          <Text>Total: {formatNumber(price)}</Text>
        </View>
      </Content>
    </CardBase>
  )
};
