import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard, AboutApp, ChangePassword, Configuration } from '../../Screens/Auth';
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
    </Navigator>
  );
}
