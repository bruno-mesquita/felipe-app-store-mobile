import { View, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Clipboard from 'expo-clipboard';


import { CardBase } from '../../../../../Components/_Bases';

import { ItemProps } from './props';
import { Container, Text, Content, Info } from './styles';

export const Item = ({ name, cellphone, departure_date, entry_date }: ItemProps) => {

  const copy = () => {
    Clipboard.setString(cellphone)
    ToastAndroid.show('Telefone copiado', ToastAndroid.SHORT);
  }

  return (
    <CardBase onPress={copy} style={{ width: '80%', alignSelf: 'center', padding: 10 }}>
      <Container>
        <Content>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="account-circle-outline" size={40} color="#c4c4c4" />
            <Text style={{ paddingLeft: 20 }}>{name}</Text>
          </View>
          <Info>
            <Text>{`Telefone: (${cellphone.substring(0,2)}) ${cellphone.substring(2,7)}-${cellphone.substring(7,11)}`}</Text>
          </Info>
          <Info>
            <Text>{`Horário: ${entry_date} - ${departure_date}`}</Text>
          </Info>
        </Content>
      </Container>
    </CardBase>
  )
}
