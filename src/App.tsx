import 'react-native-gesture-handler';

import registerRootComponent from 'expo/build/launch/registerRootComponent';

import './config/reactotron';
import { Styles } from './Styles';
import Navigation from './Navigation';
import { StatusBar, AppLoading } from './Components';
import { AuthProvider } from './contexts/AuthContext';

const App = () => (
  <AuthProvider>
    <AppLoading>
      <Styles>
        <StatusBar />
        <Navigation />
      </Styles>
    </AppLoading>
  </AuthProvider>
);

registerRootComponent(App);
