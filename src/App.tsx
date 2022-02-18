import 'react-native-gesture-handler';

import { NativeBaseProvider } from 'native-base';
import { Styles } from './Styles';
import Navigation from './Navigation';
import { StatusBar, AppLoading } from './Components';
import StoreProvider from './store/Provider';
import { Notifications } from '@components';

const App = () => (
  <AppLoading>
    <NativeBaseProvider>
      <StoreProvider>
        <Notifications />
        <Styles>
          <StatusBar />
          <Navigation />
        </Styles>
      </StoreProvider>
    </NativeBaseProvider>
  </AppLoading>
);

export default App;
