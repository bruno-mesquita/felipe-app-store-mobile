import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { getApi } from '../../../services/api';
import { requestEstablishmentExistsSuccess } from '../../../Store/ducks/auth/auth.actions';

import { Item, Divider } from './Components';
import { Container, Row, Footer, Header, TitleFooter, ViewTitle, Text } from './styles';

export const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState(false);

  const getEstablishmentExists = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/establishments/exists');

      dispatch(requestEstablishmentExistsSuccess(data.result));
    } catch (err) {

    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getEstablishmentExists();
  }, [getEstablishmentExists])


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
      {loading ? (
        <ActivityIndicator color={colors.primary} size={width * 0.3} />
      ) : (
        <>
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
            <Item onPress={toGoSupport} never>
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
        </>
      )}
    </Container>
  )
}
