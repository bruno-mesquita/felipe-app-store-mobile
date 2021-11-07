import { useState, useEffect } from 'react';
import { View, Text, Alert, Linking, ActivityIndicator, ToastAndroid } from 'react-native';
import { format, parseISO } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import Clipboard from 'expo-clipboard';

import formatNumber from '../../../../../utils/format-number';
import { CardBase } from '../../../../../Components';
import { CardProps } from './props';
import { Content } from './styles';
import { getApi } from '../../../../../services/api';

export const Card = (props: CardProps) => {
  const { colors } = useTheme();

  const [newBoletoLoading, setNewBoletoLoading] = useState(false);
  const [ticket, setTicket] = useState<CardProps>({
    barcode: '', status: '', date_of_expiration: '', id: 0, link: '', price: 0
  });

  useEffect(() => {
    setTicket(props);
  }, []);

  const copy = () => {
    Clipboard.setString(ticket.barcode);
    ToastAndroid.show('Codigo de barra copiado', ToastAndroid.SHORT);
  }

  const newTicket = async () => {
    try {
      const api = getApi();

      setNewBoletoLoading(true)
      const { data } = await api.get(`/tickets/${ticket.id}/new`);

      setTicket(data.result);
    } catch (err) {
      console.log(err.response);
      Alert.alert('Erro', 'Houve um erro ao atualizar o boleto, se o erro persistir entre em contato com o suporte')
    } finally {
      setNewBoletoLoading(false);
    }
  }

  const download = async () => {
    const result = await Linking.canOpenURL(ticket.link);

    if(result) Linking.openURL(ticket.link);
  };

  const formattedDate = (date: string) => {
    return date !== '' ? format(parseISO(date), "dd/MM/yyyy") : date;
  }

  const onPress = () => {
    const buttons: any = [
      {
        text: 'Fechar',
      },
    ]

    if(ticket.status === 'pending') {
      buttons.push({ text: 'Baixar', onPress: download });
      buttons.push({ text: 'Copiar codigo de barra', onPress: copy });
    }

    if(ticket.status === 'cancelled') {
      buttons.push({ text: 'Gerar novo boleto', onPress: newTicket });
    }

    Alert.alert('Boleto - Flipp Delivery', '', buttons);
  };

  const getIcon = () => {
    switch (ticket.status) {
      case 'pending': return 'clock'
      case 'cancelled': return 'close-circle'
      case 'approved': return 'check-circle'
      default: return 'clock'
    }
  }

  return (
    <CardBase onPress={onPress} style={{ width: '80%', alignSelf: 'center' }}>
      <Content>
        <View style={{ justifyContent: 'center' }}>
          {newBoletoLoading ? (
            <ActivityIndicator color={colors.third} size={30} />
          ) : (
            <MaterialCommunityIcons name={getIcon()} size={30} color={ticket.status === 'cancelled' ? colors.primary : colors.third} />
          )}
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Text>Vecimento: {formattedDate(ticket.date_of_expiration)}</Text>
          <Text>Total: {formatNumber(ticket.price)}</Text>
        </View>
      </Content>
    </CardBase>
  )
};
