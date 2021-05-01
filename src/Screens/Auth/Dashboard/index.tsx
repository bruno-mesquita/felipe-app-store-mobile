import React from 'react';
import { Alert } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { Container, Row, Footer, Header, TitleFooter, ViewTitle, Text } from './styles';
import { Item, Divider } from './Components';

export const Dashboard = ({ navigation }) => {

  const toGoMenus = () => navigation.navigate('Menus');
  const toGoProducts = () => navigation.navigate('Products');
  const toGoConfiguration = () => navigation.navigate('Configuration');
  const toGoRatings = () => navigation.navigate('Ratings');
  const notImplement = () => Alert.alert('Não implementada', 'Infelizmente a nossa equipe ainda não fez essa função :( ');

  const iconProps = (name: any) => ({ name, size: 50, color: '#fff' })

  return (
    <Container>
      <Header>
      <Row>
        <Item onPress={toGoProducts}>
          <AntDesign {...iconProps('barcode')} />
          <Text>Produtos</Text>
        </Item>
        <Item onPress={notImplement}>
          <Ionicons {...iconProps('bar-chart-outline')} />
          <Text>Relatório de vendas</Text>
        </Item>
        <Item onPress={toGoConfiguration}>
          <Ionicons {...iconProps('md-settings-sharp')} />
          <Text>Configurações</Text>
        </Item>
      </Row>
      <Row>
        <Item onPress={toGoRatings}>
          <Ionicons {...iconProps('star-sharp')} />
          <Text>Avaliações</Text>
        </Item>
        <Item onPress={notImplement}>
          <MaterialIcons {...iconProps('support-agent')} />
          <Text>Suporte</Text>
        </Item>
        <Item onPress={notImplement}>
          <Ionicons {...iconProps('print-outline')} />
          <Text>Boletos</Text>
        </Item>
      </Row>
      <Row>
        <Item onPress={toGoMenus}>
          <AntDesign {...iconProps('menufold')} />
          <Text>Cardapios</Text>
        </Item>
      </Row>
      </Header>
      <Footer>
      <ViewTitle>
        <Divider />
        <TitleFooter>Pedidos</TitleFooter>
        <Divider />
      </ViewTitle>
      <Row>
        <Item>
          <MaterialIcons  {...iconProps('schedule')} />
          <Text>Em andamento</Text>
        </Item>
        <Item onPress={notImplement}>
          <MaterialIcons {...iconProps('sports-motorsports')} />
          <Text>Entregues</Text>
        </Item>
        <Item onPress={notImplement}>
          <MaterialCommunityIcons {...iconProps('cancel')} />
          <Text>Cancelados</Text>
        </Item>
      </Row>
      </Footer>
    </Container>
  )
}
