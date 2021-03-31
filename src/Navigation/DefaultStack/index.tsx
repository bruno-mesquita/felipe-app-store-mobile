import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard } from '../../Screens/Auth';
import options from './configHeader';

const { Navigator, Screen } = createStackNavigator();

export default function NativeStackRoutes() {
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          ...options
        }}
      />

    </Navigator>
  );
}
