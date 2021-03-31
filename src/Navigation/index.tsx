import React from 'react';
import { useSelector } from 'react-redux';

import { DrawerNavigation } from './Drawer';
import NotAuthStack from './NotAuthStack';

const Navigation = () => {
  const { logged } = useSelector(({ auth }) => auth);

  return <>{!logged ? <DrawerNavigation /> : <NotAuthStack />}</>;
};

export default Navigation;
