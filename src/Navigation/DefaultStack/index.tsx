import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Dashboard,
  AboutApp,
  ChangePassword,
  Configuration,
  Menus,
  RegisterMenu,
  Products,
  ProductRegistration,
  UpdateMenu,
  ProductUpdate,
  Ratings,
  Orders,
  Profile,
  Support,
  TermsUse,
  CanceledOrders,
  OrdersDelivered,
  Boletos,
  SalesReport,
  CreateEstablishment,
  UpdateEstablishment,
  Deliverymen,
} from '../../Screens/Auth';
import options from './configHeader';

const { Navigator, Screen } = createNativeStackNavigator();

export default function NativeStackRoutes() {
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => options({ navigation })}
      />

      <Screen name="AboutApp" component={AboutApp} options={{ headerShown: false }} />

      <Screen
        name="ChangePassword"
        component={ChangePassword}
        options={({ navigation }) => options({ name: 'Mudar senha', navigation })}
      />

      <Screen
        name="Configuration"
        component={Configuration}
        options={({ navigation }) => options({ name: 'Configurações', navigation })}
      />

      <Screen
        name="Menus"
        component={Menus}
        options={({ navigation }) => options({ name: 'Categorias', navigation })}
      />

      <Screen
        name="RegisterMenu"
        component={RegisterMenu}
        options={({ navigation }) =>
          options({ name: 'Cadastro de Categoria', navigation })
        }
      />

      <Screen
        name="UpdateMenu"
        component={UpdateMenu}
        options={({ navigation }) => options({ name: 'Atualizar Categoria', navigation })}
      />

      <Screen
        name="Products"
        component={Products}
        options={({ navigation }) => options({ name: 'Produtos', navigation })}
      />

      <Screen
        name="ProductRegistration"
        component={ProductRegistration}
        options={({ navigation }) => options({ name: 'Cadastro de produto', navigation })}
      />

      <Screen
        name="ProductUpdate"
        component={ProductUpdate}
        options={({ navigation }) => options({ name: 'Atualizar produto', navigation })}
      />

      <Screen
        name="Orders"
        component={Orders}
        options={({ navigation }) => options({ name: 'Pedidos', navigation })}
      />

      <Screen
        name="CanceledOrders"
        component={CanceledOrders}
        options={({ navigation }) => options({ name: 'Pedidos cancelados', navigation })}
      />

      <Screen
        name="OrdersDelivered"
        component={OrdersDelivered}
        options={({ navigation }) => options({ name: 'Pedidos entregados', navigation })}
      />

      <Screen
        name="Ratings"
        component={Ratings}
        options={({ navigation }) => options({ name: 'Avaliações', navigation })}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => options({ name: 'Meu perfil', navigation })}
      />

      <Screen
        name="Support"
        component={Support}
        options={({ navigation }) => options({ name: 'Suporte', navigation })}
      />

      <Screen
        name="TermsUse"
        component={TermsUse}
        options={({ navigation }) => options({ name: 'Termos de uso', navigation })}
      />

      <Screen
        name="Boletos"
        component={Boletos}
        options={({ navigation }) => options({ name: 'Boletos', navigation })}
      />

      <Screen
        name="SalesReport"
        component={SalesReport}
        options={({ navigation }) => options({ name: 'Relatório de vendas', navigation })}
      />

      <Screen
        name="CreateEstablishment"
        component={CreateEstablishment}
        options={({ navigation }) => options({ name: 'Minha loja', navigation })}
      />

      <Screen
        name="UpdateEstablishment"
        component={UpdateEstablishment}
        options={({ navigation }) => options({ name: 'Minha loja', navigation })}
      />

      <Screen
        name="Deliverymen"
        component={Deliverymen}
        options={({ navigation }) => options({ name: 'Motoboys Flipp', navigation })}
      />
    </Navigator>
  );
}
