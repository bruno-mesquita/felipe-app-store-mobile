import { NavigationContainer } from '@react-navigation/native';

import { Notifications } from '@components';
import { useAppSelector } from '@store/hooks';

import DefaultStack from './DefaultStack';
import NotAuthStack from './NotAuthStack';

const Navigation = () => {
  const signed = useAppSelector((store) => store.auth.signed);

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
