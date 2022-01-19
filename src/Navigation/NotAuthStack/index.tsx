import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Login,
  CodeToForgotPassword,
  CodeToPassword,
  ForgotPassword,
} from '../../Screens/NotAuth';

const { Navigator, Screen } = createNativeStackNavigator();

export default function NavigationStackNotAuth() {
  return (
    <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="CodePassword" component={CodeToPassword} />
      <Screen name="CodeToForgotPassword" component={CodeToForgotPassword} />
    </Navigator>
  );
}
