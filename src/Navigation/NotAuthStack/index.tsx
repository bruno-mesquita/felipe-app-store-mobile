import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login, CodeToForgotPassword, CodeToPassword, ForgotPassword } from '../../Screens/NotAuth';
import options from './configHeader';

const { Navigator, Screen } = createNativeStackNavigator();

export default function NavigationStackNotAuth() {
  return (
      <Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Login" component={Login} />

        <Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            ...options('Esqueci minha senha'),
          }}
        />
        <Screen
          name="CodePassword"
          component={CodeToPassword}
          options={{
            ...options('Código de trocar senha'),
          }}
        />
        <Screen name="CodeToForgotPassword" component={CodeToForgotPassword} />
      </Navigator>
  );
}
