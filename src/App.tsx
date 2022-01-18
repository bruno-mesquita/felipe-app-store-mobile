import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Styles } from './Styles';
import Navigation from './Navigation';
import { StatusBar, AppLoading } from './Components';
import StoreProvider from './store/Provider';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <StoreProvider>
      <AppLoading>
        <Styles>
          <StatusBar />
          <Navigation />
        </Styles>
      </AppLoading>
    </StoreProvider>
  </GestureHandlerRootView>
);

export default App;
