import { useState } from 'react';
import { Alert, FlatList, View, Text, ScrollView } from 'react-native';
import { format, parseISO } from 'date-fns';

import api from '@services/api';
import { FieldMask } from '../../../Components/FormUtils';
import { Button } from '../../../Components';
import formatNumber from '../../../utils/format-number';
import { Container, FlatListHeader } from './styles';

export const SalesReport = () => {
  const [init, setInit] = useState('');
  const [end, setEnd] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const formattedDate = (date: string) => {
    return format(parseISO(date), 'dd/MM/yyyy');
  };

  const onSubmit = async () => {
    try {
      const { data } = await api.get<{ result: any[] }>('/generate-report', {
        params: {
          data_initial: init,
          data_final: end,
        },
      });

      setOrders(data.result);

      setTotal(
        data.result.reduce(
          (previous, current) => Number(current.total) + previous,
          0
        )
      );
    } catch (err) {
      Alert.alert(
        'Erro',
        'Parece que houve um erro ao gerar o seu relatório, por favor tente novamente'
      );
    }
  };

  const Header = (
    <FlatListHeader>
      <Text style={{ color: '#fff' }}>Dia</Text>
      <Text style={{ color: '#fff' }}>Valor</Text>
    </FlatListHeader>
  );

  const Footer = (
    <FlatListHeader>
      <Text style={{ color: '#fff' }}>Total</Text>
      <Text style={{ color: '#fff' }}>{formatNumber(total)}</Text>
    </FlatListHeader>
  );

  return (
    <ScrollView>
      <Container>
        <FieldMask
          value={init}
          type="datetime"
          options={{ format: 'DD/MM/YYYY' }}
          placeholder="DD/MM/AAAA"
          label="Data de inicio"
          labelColor="#000"
          onChangeText={setInit}
        />

        <FieldMask
          value={end}
          type="datetime"
          options={{ format: 'DD/MM/YYYY' }}
          placeholder="DD/MM/AAAA"
          label="Data final"
          labelColor="#000"
          onChangeText={setEnd}
        />

        <Button style={{ marginTop: 10 }} onPress={onSubmit}>
          Gerar
        </Button>

        <FlatList
          style={{ width: '100%' }}
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
          data={orders}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 5,
                borderColor: '#6e6d6d',
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <Text style={{ color: '#000' }}>
                {formattedDate(item.createdAt)}
              </Text>
              <Text style={{ color: '#000' }}>{formatNumber(item.total)}</Text>
            </View>
          )}
        />
      </Container>
    </ScrollView>
  );
};
