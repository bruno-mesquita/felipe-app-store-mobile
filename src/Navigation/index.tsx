import { NavigationContainer } from '@react-navigation/native';

import { useAppSelector } from '@store/hooks';

import DefaultStack from './DefaultStack';
import NotAuthStack from './NotAuthStack';

const Navigation = () => {
  const signed = useAppSelector((store) => store.auth.signed);

  return (
    <NavigationContainer>
      {signed ? <DefaultStack /> : <NotAuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
