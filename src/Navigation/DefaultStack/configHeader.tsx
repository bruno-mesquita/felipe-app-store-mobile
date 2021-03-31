import React from 'react';
import { Image } from 'react-native';

const Header = () => (
  <Image
    style={{ width: 90, height: 43 }}
    source={require('../../assets/images/logo.png')}
  />
);


export default {
  headerTitleAlign: 'center' as any,
  headerStyle: {
    backgroundColor: '#9E0404',
  },
  headerTitle: () => <Header />,
}
