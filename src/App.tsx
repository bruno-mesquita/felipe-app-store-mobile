import 'react-native-gesture-handler';

import registerRootComponent from 'expo/build/launch/registerRootComponent';

import './config/reactotron';
import { Styles } from './Styles';
import Navigation from './Navigation';
import { Store } from './Store';
import { StatusBar, AppLoading } from './Components';

const App = () => (
  <AppLoading>
    <Store>
      <Styles>
        <StatusBar />
        <Navigation />
      </Styles>
    </Store>
  </AppLoading>
);

registerRootComponent(App);
