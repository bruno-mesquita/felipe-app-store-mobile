import React from 'react';
import { useSelector } from 'react-redux';

import DefaultStack from './DefaultStack';
import NotAuthStack from './NotAuthStack';

const Navigation = () => {
  const { logged } = useSelector(({ auth }) => auth);

  return <>{!logged ? <DefaultStack /> : <NotAuthStack />}</>;
};

export default Navigation;
