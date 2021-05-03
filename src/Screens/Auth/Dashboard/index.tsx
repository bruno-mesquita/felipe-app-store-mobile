import React from 'react';
import { Ionicons, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { Container, Row, Footer, Header, TitleFooter, ViewTitle, Text } from './styles';
import { Item, Divider } from './Components';

export const Dashboard = ({ navigation }) => {

  const toGoMenus = () => navigation.navigate('Menus');
  const toGoProducts = () => navigation.navigate('Products');
  const toGoRatings = () => navigation.navigate('Ratings');
  const toGoSupport = () => navigation.navigate('Support');
  const toGoCanceledOrders = () => navigation.navigate('CanceledOrders');
  const toGoOrders = () => navigation.navigate('Orders');
  const toGoOrdersDelivered = () => navigation.navigate('OrdersDelivered');
  const toGoBoletos = () => navigation.navigate('Boletos');
  const toGoSalesReport = () => navigation.navigate('SalesReport');

  const iconProps = (name: any) => ({ name, size: 50, color: '#fff' })

  return (
    <Container>
      <Header>
      <Row>
      <Item onPress={toGoBoletos}>
          <Ionicons {...iconProps('print-outline')} />
          <Text>Boletos</Text>
        </Item>
        <Item onPress={toGoSalesReport}>
          <Ionicons {...iconProps('bar-chart-outline')} />
          <Text>Relatório de vendas</Text>
        </Item>
        <Item onPress={toGoSupport}>
          <MaterialIcons {...iconProps('support-agent')} />
          <Text>Suporte</Text>
        </Item>
      </Row>
      <Row>
        <Item onPress={toGoMenus}>
          <AntDesign {...iconProps('menufold')} />
          <Text>Cardapios</Text>
        </Item>
        <Item onPress={toGoProducts}>
          <AntDesign {...iconProps('barcode')} />
          <Text>Produtos</Text>
        </Item>
        <Item onPress={toGoRatings}>
          <Ionicons {...iconProps('star-sharp')} />
          <Text>Avaliações</Text>
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
        <Item onPress={toGoCanceledOrders}>
          <MaterialCommunityIcons {...iconProps('cancel')} />
          <Text>Cancelados</Text>
        </Item>
        <Item onPress={toGoOrdersDelivered}>
          <MaterialIcons {...iconProps('sports-motorsports')} />
          <Text>Entregues</Text>
        </Item>
        <Item onPress={toGoOrders}>
          <MaterialIcons  {...iconProps('schedule')} />
          <Text>Em andamento</Text>
        </Item>
      </Row>
      </Footer>
    </Container>
  )
}
