import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@contexts/AuthContext';
import DefaultStack from './DefaultStack';
import NotAuthStack from './NotAuthStack';

const Navigation = () => {
  const { signed } = useAuth();

  return <NavigationContainer>{signed ? <DefaultStack /> : <NotAuthStack />}</NavigationContainer>;
};

export default Navigation;
