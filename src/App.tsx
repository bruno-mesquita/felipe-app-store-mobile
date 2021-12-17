import { GestureHandlerRootView } from 'react-native-gesture-handler';

import './config/reactotron';
import { Styles } from './Styles';
import Navigation from './Navigation';
import { StatusBar, AppLoading } from './Components';
import { AuthProvider } from './contexts/AuthContext';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <AppLoading>
        <Styles>
          <StatusBar />
          <Navigation />
        </Styles>
      </AppLoading>
    </AuthProvider>
  </GestureHandlerRootView>
);

export default App;
