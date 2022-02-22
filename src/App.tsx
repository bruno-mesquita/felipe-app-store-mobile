import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';

import { Styles } from './Styles';
import theme from './Styles/native-base.theme';
import Navigation from './Navigation';
import { StatusBar, AppLoading } from './Components';
import StoreProvider from './store/Provider';
import { Notifications, ApiConfig } from '@components';

const App = () => (
  <AppLoading>
    <NativeBaseProvider theme={theme}>
      <StoreProvider>
        <ApiConfig>
          <Notifications />
          <Styles>
            <StatusBar />
            <Navigation />
          </Styles>
        </ApiConfig>
      </StoreProvider>
    </NativeBaseProvider>
  </AppLoading>
);

export default App;
