import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import DefaultStack from './DefaultStack';
import NotAuthStack from './NotAuthStack';

const Navigation = () => {
  const { logged } = useSelector(({ auth }) => auth);

  return <NavigationContainer>{logged ? <DefaultStack /> : <NotAuthStack />}</NavigationContainer>;
};

export default Navigation;
