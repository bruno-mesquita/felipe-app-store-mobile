import 'react-native-gesture-handler';

import React from 'react';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Root } from 'native-base';

import './config/reactotron';
import { Styles } from './Styles';
import Navigation from './Navigation';
import { Store } from './Store';
import { StatusBar, AppLoading } from './Components';

const App = () => (
  <AppLoading>
    <Root>
      <Store>
        <Styles>
          <StatusBar />
          <Navigation />
        </Styles>
      </Store>
    </Root>
  </AppLoading>
);

registerRootComponent(App);
