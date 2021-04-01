import React from 'react';
import { Image } from 'react-native';

const Header = () => (
  <Image
    style={{ width: 90, height: 43 }}
    source={require('../../assets/images/logo.png')}
  />
);


export default (name?: string | undefined) => ({
  headerTitleAlign: 'center' as any,
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#9E0404',
  },
  headerTitle: name ? name : () => <Header />,
})
