import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DefaultStack from '../DefaultStack';
import { Drawer } from '../../Components';

const { Navigator, Screen } = createDrawerNavigator();

export const DrawerNavigation = () =>(
  <NavigationContainer>
    <Navigator drawerContent={props => <Drawer {...props} />}>
      <Screen name="Dashboard" component={DefaultStack} />
    </Navigator>
  </NavigationContainer>
);
