import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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
  TermsUse
} from '../../Screens/Auth';
import options from './configHeader';

const { Navigator, Screen } = createStackNavigator();

export default function NativeStackRoutes() {
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          ...options()
        }}
      />

      <Screen
        name="AboutApp"
        component={AboutApp}
        options={{
          ...options('Sobre o App')
        }}
      />

      <Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          ...options('Mudar senha')
        }}
      />

      <Screen
        name="Configuration"
        component={Configuration}
        options={{
          ...options('Configurações')
        }}
      />

      <Screen
        name="Menus"
        component={Menus}
        options={{
          ...options('Cardapios')
        }}
      />

      <Screen
        name="RegisterMenu"
        component={RegisterMenu}
        options={{
          ...options('Cadastro de cardápio')
        }}
      />

      <Screen
        name="UpdateMenu"
        component={UpdateMenu}
        options={{
          ...options('Atualizar cardápio')
        }}
      />

      <Screen
        name="Products"
        component={Products}
        options={{
          ...options('Produtos')
        }}
      />

      <Screen
        name="ProductRegistration"
        component={ProductRegistration}
        options={{
          ...options('Cadastro de produto')
        }}
      />

      <Screen
        name="ProductUpdate"
        component={ProductUpdate}
        options={{
          ...options('Atualizar produto')
        }}
      />

      <Screen
        name="Orders"
        component={Orders}
        options={{
          ...options('Pedidos')
        }}
      />

      <Screen
        name="Ratings"
        component={Ratings}
        options={{
          ...options('Avaliações')
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          ...options('Meu perfil')
        }}
      />

      <Screen
        name="Support"
        component={Support}
        options={{
          ...options('Suporte')
        }}
      />

      <Screen
        name="TermsUse"
        component={TermsUse}
        options={{
          ...options('Termos de uso')
        }}
      />
    </Navigator>
  );
}
