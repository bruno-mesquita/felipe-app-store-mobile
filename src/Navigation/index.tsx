import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@contexts/AuthContext';
import DefaultStack from './DefaultStack';
import NotAuthStack from './NotAuthStack';
import { Notifications } from '@components';

const Navigation = () => {
  const { signed } = useAuth();

  return (
    <NavigationContainer>
      {signed ? (
        <>
          <DefaultStack />
          <Notifications />
        </>
      ) : (
        <NotAuthStack />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
