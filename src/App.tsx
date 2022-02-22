import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';

import { Notifications, ApiConfig, StatusBar, AppLoading } from '@components';

import './utils/yup';
import { Styles } from './Styles';
import theme from './Styles/native-base.theme';
import Navigation from './Navigation';
import StoreProvider from './store/Provider';

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
