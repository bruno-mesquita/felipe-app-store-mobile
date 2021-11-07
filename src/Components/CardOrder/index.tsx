import { View, TouchableOpacity } from 'react-native';
import { parseISO, format } from 'date-fns';

import formatPrice from '../../utils/format-number';
import { CardBase } from '../_Bases';

import { ItemProps, Address } from './props';
import { Text, Content } from './styles';

export const CardOrder = ({ address_client: { client, ...address }, createdAt, total, payment, client_order_status, onPress, id }: ItemProps) => {
  const formattedDate = (date: string) => {
    return format(parseISO(date), "dd/MM/yyyy '-' HH:mm")
  }

  const formattedAddress = ({ city, ...rest }: Omit<Address, 'client'>) => {
    return `${rest.street}, ${rest.neighborhood} - ${rest.number}, ${city.name} - ${city.state.name} - ${rest.cep}`
  }

  return (
    <CardBase onPress={() => onPress(id)} style={{ width: '90%', alignSelf: 'center' }}>
      <Content>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, width: '100%' }}>
          <Text style={{ textTransform: 'uppercase' }}>Status: {client_order_status}</Text>
          <Text>{formattedDate(createdAt)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingTop: 10 }}>
          <Text>Nome: {client.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingTop: 10 }}>
          <Text>Telefone: {client.cellphone}</Text>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <Text>Endereço: {formattedAddress(address)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingTop: 10 }}>
          <Text>Pagamento: {payment}</Text>
          <Text>Total: {formatPrice(total)}</Text>
        </View>
      </Content>
    </CardBase>
  )
}
