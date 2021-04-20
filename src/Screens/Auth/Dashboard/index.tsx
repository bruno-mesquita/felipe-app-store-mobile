import React from 'react';
import { Text } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { Container, Row, Footer, Header, TitleFooter, ViewTitle } from './styles';
import { Item, Divider } from './Components';

export const Dashboard = () => {

  return (
    <Container>
      <Header>
      <Row>
        <Item>
          <AntDesign name="barcode" size={50} color="#fff" />
          <Text style={{ color: '#fff', textAlign: 'center' }}>Cadastrar produto</Text>
        </Item>
        <Item>
          <Ionicons name="bar-chart-outline" size={50} color="#fff" />
          <Text style={{ color: '#fff', textAlign: 'center' }}>Relatório de vendas</Text>
        </Item>
        <Item>
          <Ionicons name="settings-outline" size={50} color="#fff" />
          <Text style={{ color: '#fff', textAlign: 'center' }}>Configurações</Text>
        </Item>
      </Row>
      <Row>
        <Item>
          <Ionicons name="star-outline" size={50} color="#fff" />
          <Text style={{ color: '#fff', textAlign: 'center' }}>Avaliações</Text>
        </Item>
        <Item>
          <MaterialIcons name="support-agent" size={50} color="#fff" />
          <Text style={{ color: '#fff', textAlign: 'center' }}>Suporte</Text>
        </Item>
        <Item>
          <Ionicons name="print-outline" size={50} color="#fff" />
          <Text style={{ color: '#fff', textAlign: 'center' }}>Boletos</Text>
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
       {/*  <Item>
          <MaterialIcons name="loadin" size={50} color="#fff" />
          <Text style={{ color: '#fff', textAlign: 'center' }}>Em andamento</Text>
        </Item> */}
        <Item>
          <MaterialIcons name="sports-motorsports" size={50} color="#fff" />
          <Text style={{ color: '#fff', textAlign: 'center' }}>Entregues</Text>
        </Item>
        <Item>
          <MaterialCommunityIcons name="cancel" size={50} color="#fff" />
          <Text style={{ color: '#fff', textAlign: 'center' }}>Cancelados</Text>
        </Item>
      </Row>
      </Footer>
    </Container>
  )
}
